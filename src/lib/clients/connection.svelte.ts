import { Client } from 'archipelago.js';
import type { ConnectedPacket, Hint, MessageNode, Player, RoomUpdatePacket } from 'archipelago.js';

let nextConnectionId = 0;

export type MessageListener = (connection: Connection, text: string, nodes: MessageNode[]) => void;

export class Connection {
	readonly id = `connection-${nextConnectionId++}`;
	readonly client = new Client();
	readonly slotName: string;

	// managers from the instance of the client
	socketManager = $derived(this.client.socket);
	messageManager = $derived(this.client.messages);
	roomStateManager = $derived(this.client.room);
	itemStateManager = $derived(this.client.items);

	// single slot connection status
	connected = $state(false);
	connecting = $state(false);
	error = $state<string | null>(null);

	// entire lobby players
	players = $state<(Player | null)[]>([]);

	// single slot game-specific information
	gameName = $state<string | null>(null);

	// single slot slot-specific information
	checksTotal = $state<number>(0);
	checksObtained = $state<number>(0);
	hints = $state<Hint[]>([]);
	hintCost = $state<number>(0);
	hintPoints = $state<number>(0);

	constructor(slotName: string, onMessage: MessageListener) {
		this.slotName = slotName;

		// messages received by the socker manager
		this.socketManager.on('connected', (packet) => {
			this.connected = true;
			this.players = this.getPlayersFromPacket(packet);

			this.gameName = this.players[packet.slot - 1]?.game ?? null;
			this.checksObtained = packet.checked_locations.length;
			this.checksTotal = packet.missing_locations.length + packet.checked_locations.length;
		});
		this.socketManager.on('roomUpdate', (packet) => {
			if (packet.players) {
				this.players = this.getPlayersFromPacket(packet);
			}
		});
		this.socketManager.on('disconnected', () => {
			this.connected = false;
			this.players = [];
		});

		// messages received by the message manager
		this.messageManager.on('message', (text, nodes) => onMessage(this, text, nodes));

		// messages received by the room manager
		const syncRoomState = () => {
			this.checksObtained = this.roomStateManager.checkedLocations.length;
			this.hintPoints = this.roomStateManager.hintPoints;
			this.hintCost = this.roomStateManager.hintCost;
		};
		this.roomStateManager.on('locationsChecked', syncRoomState);
		this.roomStateManager.on('hintPointsUpdated', syncRoomState);
		this.roomStateManager.on('hintCostUpdated', syncRoomState);

		// messages received by the item state manager
		const syncHints = () => (this.hints = this.itemStateManager.hints);
		this.itemStateManager.on('hintsInitialized', syncHints);
		this.itemStateManager.on('hintReceived', syncHints);
		this.itemStateManager.on('hintFound', syncHints);
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
