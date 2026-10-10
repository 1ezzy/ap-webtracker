import { Client } from 'archipelago.js';
import type { ConnectedPacket, Hint, MessageNode, Player, RoomUpdatePacket } from 'archipelago.js';

let nextConnectionId = 0;

export type MessageListener = (connection: Connection, text: string, nodes: MessageNode[]) => void;

export class Connection {
	readonly id = `connection-${nextConnectionId++}`;
	readonly client = new Client();
	readonly slotName: string;

	socketManager = $derived(this.client.socket);
	messageManager = $derived(this.client.messages);
	roomStateManager = $derived(this.client.room);
	itemStateManager = $derived(this.client.items);

	connected = $state(false);
	connecting = $state(false);
	error = $state<string | null>(null);
	players = $state<(Player | null)[]>([]);

	gameName = $state<string | null>(null);
	checksTotal = $state<number>(0);
	checksCompleted = $state<number>(0);

	hints = $derived<Hint[]>([]);
	hintCost = $derived<number>(this.roomStateManager.hintCost);
	hintPoints = $derived<number>(this.roomStateManager.hintPoints);

	constructor(slotName: string, onMessage: MessageListener) {
		this.slotName = slotName;

		// messages received by the socker manager
		this.socketManager.on('connected', (packet) => {
			this.connected = true;
			this.players = this.getPlayersFromPacket(packet);

			console.log(packet);

			this.gameName = this.players[packet.slot - 1]?.game ?? null;
			this.checksCompleted = packet.checked_locations.length;
			this.checksTotal = packet.missing_locations.length + packet.checked_locations.length;
		});
		this.socketManager.on('roomUpdate', (packet) => {
			this.players = this.getPlayersFromPacket(packet);
		});
		this.socketManager.on('disconnected', () => {
			this.connected = false;
			this.players = [];
		});

		// messages received by the message manager
		this.messageManager.on('message', (text, nodes) => onMessage(this, text, nodes));

		// messages received by the room manager
		this.roomStateManager.on('locationsChecked', () => {
			this.checksCompleted = this.roomStateManager.checkedLocations.length;
		});

		// messages received by the item state manager
		this.itemStateManager.on('hintsInitialized', (hints) => (this.hints = hints));
		this.itemStateManager.on('hintReceived', (hint) => this.hints.push(hint));
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
