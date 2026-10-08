export type ParsedChatInput =
	| { type: 'message'; text: string }
	| { type: 'hint'; itemName: string }
	| { type: 'invalid' };

export const parseChatInput = (input: string): ParsedChatInput => {
	const trimmed = input.trim();

	if (!trimmed) {
		return { type: 'invalid' };
	}

	if (!trimmed.startsWith('!')) {
		return { type: 'message', text: trimmed };
	}

	// !hint item name
	const [, commandName, args = ''] = trimmed.match(/^!(\S+)\s*(.*)$/) ?? [];

	switch (commandName?.toLowerCase()) {
		case 'hint':
			return args ? { type: 'hint', itemName: args } : { type: 'invalid' };
		default:
			return { type: 'invalid' };
	}
};
