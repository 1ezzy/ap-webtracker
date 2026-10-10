import type { MessageNode, Player } from 'archipelago.js';
import { Connection } from './connection.svelte';
import { SvelteSet } from 'svelte/reactivity';

export type FeedMessage = {
	id: string;
	text: string;
	nodes: MessageNode[];
	receivedAt: number;
};

const RECENT_MESSAGE_LIMIT = 200;
const DEDUPE_WINDOW_MS = 500;

class ConnectionManager {
	connections = $state<Connection[]>([]);
	feed = $state<FeedMessage[]>([]);

	private serverUrl: string | null = null;
	private password: string | undefined;
	private recentMessages = new Map<string, number>();
	private nextMessageId = 0;

	protected hostName: string | null = null;
	protected portNum: string | null = null;

	get connecting() {
		return this.connections.some((connection) => connection.connecting);
	}

	get connected() {
		return this.connections.some((connection) => connection.connected);
	}

	get players() {
		return this.connections.find((connection) => connection.connected)?.players ?? [];
	}

	get connectedSlots() {
		const slots = new SvelteSet<number>();
		for (const connection of this.connections) {
			if (connection.slotId !== null) {
				slots.add(connection.slotId);
			}
		}
		return slots;
	}

	get connectedPlayers() {
		const connectedPlayers: (Player | null)[] = [];
		for (const connection of this.connections) {
			if (connection.slotId !== null) {
				connectedPlayers.push(this.players[connection.slotId - 1]);
			}
		}

		return connectedPlayers;
	}

	getConnectionBySlot(slot: number) {
		return this.connections.find((connection) => connection.slotId === slot);
	}

	async createConnection(url: string, slotName: string, password?: string) {
		const connection = this.createAdditionalConnection(slotName);

		try {
			await connection.connect(url, password);
		} catch (err) {
			this.connections = this.connections.filter((c) => c.id !== connection.id);
			throw err;
		}

		this.serverUrl = url;
		this.password = password;

		this.setHostNameAndPort();

		return connection;
	}

	async addConnection(slotName: string) {
		if (!this.serverUrl) {
			throw new Error('No active server to connect additional slots to.');
		}

		const connection = this.createAdditionalConnection(slotName);

		try {
			await connection.connect(this.serverUrl, this.password);
		} catch (err) {
			this.connections = this.connections.filter((c) => c.id !== connection.id);
			throw err;
		}

		return connection;
	}

	removeConnection(id: string) {
		const connection = this.connections.find((c) => c.id === id);
		connection?.disconnect();

		this.connections = this.connections.filter((c) => c.id !== id);
	}

	getConnectionFormInfo() {
		return { hostName: this.hostName, portNum: this.portNum };
	}

	private setHostNameAndPort() {
		if (!this.serverUrl) {
			this.hostName = null;
			this.portNum = null;
			return;
		}

		const hasProtocol = /^[a-z]+:\/\//i.test(this.serverUrl);
		const url = new URL(hasProtocol ? this.serverUrl : `wss://${this.serverUrl}`);

		this.hostName = url.hostname;
		this.portNum = url.port;
	}

	private createAdditionalConnection(slotName: string) {
		const connection = new Connection(slotName, (_connection, text, nodes) =>
			this.ingestMessage(text, nodes)
		);
		this.connections.push(connection);
		return connection;
	}

	private ingestMessage(text: string, nodes: MessageNode[]) {
		const now = performance.now();
		this.dedupeRecentMessages(now);

		if (this.recentMessages.has(text)) {
			return;
		}
		this.recentMessages.set(text, now);

		if (this.recentMessages.size > RECENT_MESSAGE_LIMIT) {
			this.recentMessages.delete(this.recentMessages.keys().next().value ?? '');
		}

		this.feed.push({ id: `message-${this.nextMessageId++}`, text, nodes, receivedAt: Date.now() });
	}

	private dedupeRecentMessages(timeNow: number) {
		for (const [text, seenAt] of this.recentMessages) {
			if (timeNow - seenAt < DEDUPE_WINDOW_MS) {
				break;
			}

			this.recentMessages.delete(text);
		}
	}
}

export const connectionManager = new ConnectionManager();
