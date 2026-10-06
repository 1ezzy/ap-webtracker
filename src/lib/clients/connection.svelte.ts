import { Client } from 'archipelago.js';
import type { ConnectedPacket, MessageNode, Player, RoomUpdatePacket } from 'archipelago.js';

let nextConnectionId = 0;

export type MessageListener = (connection: Connection, text: string, nodes: MessageNode[]) => void;

export class Connection {
	readonly id = `connection-${nextConnectionId++}`;
	readonly client = new Client();
	readonly slotName: string;

	connected = $state(false);
	connecting = $state(false);
	error = $state<string | null>(null);
	players = $state<(Player | null)[]>([]);

	gameName = $state<string | null>(null);
	checksFound = $state<number>(0);
	checksTotal = $state<number>(0);

	constructor(slotName: string, onMessage: MessageListener) {
		this.slotName = slotName;

		this.client.socket.on('connected', (packet) => {
			this.connected = true;
			this.players = this.getPlayersFromPacket(packet);

			console.log(packet.checked_locations, packet.missing_locations);
			this.gameName = this.players[packet.slot - 1]?.game ?? null;
			this.checksFound = packet.checked_locations.length;
			this.checksTotal = packet.missing_locations.length + packet.checked_locations.length;
		});

		this.client.socket.on('roomUpdate', (packet) => {
			this.players = this.getPlayersFromPacket(packet);
		});

		this.client.socket.on('disconnected', () => {
			this.connected = false;
			this.players = [];
		});

		this.client.messages.on('message', (text, nodes) => onMessage(this, text, nodes));
	}

	async connect(url: string, password?: string) {
		if (this.connecting || this.connected) {
			return;
		}

		this.connecting = true;
		this.error = null;
		try {
			await this.client.login(url, this.slotName, undefined, { password, tags: ['AP Webtracker'] });
		} catch (err) {
			this.error = err instanceof Error ? err.message : 'Failed to connect';
			throw err;
		} finally {
			this.connecting = false;
		}
	}

	disconnect() {
		this.client.socket.disconnect();
	}

	get slotId() {
		return this.connected ? this.client.players.self.slot : null;
	}

	private getPlayersFromPacket(packet: ConnectedPacket | RoomUpdatePacket) {
		return (
			packet.players?.map(
				(networkPlayer) => this.client.players.findPlayer(networkPlayer.slot) || null
			) ?? []
		);
	}
}
