import { Client } from 'archipelago.js';
import type { ConnectedPacket, Player, RoomInfoPacket, RoomUpdatePacket } from 'archipelago.js';

class ArchipelagoStore {
	private client = new Client();

	connected = $state(false);
	connecting = $state(false);
	players = $state<(Player | null)[]>([]);
	roomInfo = $state<RoomInfoPacket | null>(null);

	constructor() {
		this.client.socket.on('connected', (packet) => {
			this.connected = true;
			this.players = this.getPlayersFromPacket(packet);
		});

		this.client.socket.on('roomUpdate', (packet) => {
			this.players = this.getPlayersFromPacket(packet);
		});

		this.client.socket.on('disconnected', () => {
			this.connected = false;
			this.players = [];
		});
	}

	async connect(url: string, slotName: string) {
		if (this.connecting || this.connected) {
			return;
		}

		try {
			await this.client.login(url, slotName);
		} finally {
			this.connecting = false;
		}
	}

	getPlayersFromPacket(packet: ConnectedPacket | RoomUpdatePacket) {
		return (
			packet.players?.map(
				(networkPlayer) => this.client.players.findPlayer(networkPlayer.slot) || null
			) ?? []
		);
	}
}

export const archipelago = new ArchipelagoStore();
