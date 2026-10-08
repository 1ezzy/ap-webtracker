import { connectionManager } from '$lib/clients/connection-manager.svelte';
import type { MessageNode } from 'archipelago.js';

export interface MessageNodeWithColor {
	node: MessageNode;
	color: string;
}

const COLOR_MESSAGE_TAILWIND_MAP: Record<string, string> = {
	bold: 'text-primary',
	underline: 'text-primary',
	red: 'text-danger',
	green: 'text-success',
	yellow: 'text-tertiary',
	blue: 'text-secondary',
	magenta: 'text-primary',
	cyan: 'text-secondary-300',
	white: 'text-white'
};

export const mapMessageWithColors = (nodes: MessageNode[]): MessageNodeWithColor[] => {
	return nodes.map((uncoloredNode) => {
		switch (uncoloredNode.type) {
			case 'item':
				if (uncoloredNode.item.progression) {
					return { node: uncoloredNode, color: 'text-success' };
				} else if (uncoloredNode.item.useful) {
					return { node: uncoloredNode, color: 'text-secondary-400' };
				} else if (uncoloredNode.item.trap) {
					return { node: uncoloredNode, color: 'text-accent' };
				}

				return { node: uncoloredNode, color: 'text-surface-600' };
			case 'location':
				return { node: uncoloredNode, color: 'text-secondary-400' };
			case 'color':
				if (COLOR_MESSAGE_TAILWIND_MAP[uncoloredNode.color]) {
					return { node: uncoloredNode, color: COLOR_MESSAGE_TAILWIND_MAP[uncoloredNode.color] };
				}

				return { node: uncoloredNode, color: 'text-surface-600' };
			case 'player':
				return connectionManager.connectedSlots.has(uncoloredNode.player.slot)
					? { node: uncoloredNode, color: 'text-primary' }
					: { node: uncoloredNode, color: 'text-surface-600' };
			case 'text':
				return { node: uncoloredNode, color: 'text-white' };
			default:
				return { node: uncoloredNode, color: 'text-white' };
		}
	});
};
