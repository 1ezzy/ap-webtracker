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

	// list of messages from the archipelago multiworld
	feed = $state<FeedMessage[]>([]);

	// connection information (derived from initial connection)
	private serverUrl: string | null = null;
	private password: string | undefined;
	private hostName: string | null = null;
	private portNum: string | null = null;

	// message information
	private recentMessages = new Map<string, number>();
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

	// returns a list of all connected slot IDs
	get connectedSlots() {
		const slots = new SvelteSet<number>();
		for (const connection of this.connections) {
			if (connection.slotId !== null) {
				slots.add(connection.slotId);
			}
		}
		return slots;
	}

	// returns a list of all connected slot Player objects
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

	// create an initial connection to the archipelago multiworld from the webtracker
	async createInitialConnection(url: string, slotName: string, password?: string) {
		const connection = this.createConnection(slotName);

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

	// add an additional connection to the archipelago multiworld from the webtracker
	async addConnection(slotName: string) {
		if (!this.serverUrl) {
			throw new Error('No active server to connect additional slots to.');
		}

		const connection = this.createConnection(slotName);

		try {
			await connection.connect(this.serverUrl, this.password);
		} catch (err) {
			this.connections = this.connections.filter((c) => c.id !== connection.id);
			throw err;
		}

		return connection;
	}

	// remove a connection from the list of connected slots
	removeConnection(id: string) {
		const connection = this.connections.find((c) => c.id === id);
		connection?.disconnect();

		this.connections = this.connections.filter((c) => c.id !== id);
	}

	// returns information needed for the "add connection" UI functionality
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

	// generic function to create a connection to the archipelago multiworld from the webtracker
	private createConnection(slotName: string) {
		const connection = new Connection(slotName, (_connection, text, nodes) =>
			this.ingestMessage(text, nodes)
		);
		this.connections.push(connection);
		return connection;
	}

	// handles a message being sent from the archipelago multiworld to the webtracker
	private ingestMessage(text: string, nodes: MessageNode[]) {
		// derive the moment the message was sent
		const now = performance.now();

		// de-duplicate messages so the same message
		// from multiple connections only appears once
		this.dedupeRecentMessages(now);

		if (this.recentMessages.has(text)) {
			return;
		}
		this.recentMessages.set(text, now);

		// remove the earliest received message once the message Map reaches its capacity
		if (this.recentMessages.size > RECENT_MESSAGE_LIMIT) {
			this.recentMessages.delete(this.recentMessages.keys().next().value ?? '');
		}

		// push a message to the message Map with an id and timestamp
		this.feed.push({ id: `message-${this.nextMessageId++}`, text, nodes, receivedAt: Date.now() });
	}

	// utililty function to check all recent messages
	// and delete repeat messages from within a 200ms window
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
