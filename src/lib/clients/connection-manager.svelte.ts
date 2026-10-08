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

class ConnectionManager {
	connections = $state<Connection[]>([]);
	feed = $state<FeedMessage[]>([]);

	private serverUrl: string | null = null;
	private password: string | undefined;
	private recentMessages = new Set<string>();
	private nextMessageId = 0;

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
		const connectedPlayers = new SvelteSet<Player | null>();
		for (const connection of this.connections) {
			if (connection.slotId !== null) {
				connectedPlayers.add(this.players[connection.slotId - 1]);
			}
		}

		return connectedPlayers;
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

	private createAdditionalConnection(slotName: string) {
		const connection = new Connection(slotName, (_connection, text, nodes) =>
			this.ingestMessage(text, nodes)
		);
		this.connections.push(connection);
		return connection;
	}

	private ingestMessage(text: string, nodes: MessageNode[]) {
		if (this.recentMessages.has(text)) {
			return;
		}
		this.recentMessages.add(text);

		if (this.recentMessages.size > RECENT_MESSAGE_LIMIT) {
			this.recentMessages.delete(this.recentMessages.values().next().value!);
		}

		this.feed.push({ id: `message-${this.nextMessageId++}`, text, nodes, receivedAt: Date.now() });
	}
}

export const connectionManager = new ConnectionManager();
