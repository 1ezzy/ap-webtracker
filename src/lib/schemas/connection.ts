import { z } from 'zod';

const PORT_RANGE_MESSAGE = 'Port must be between 1 and 65535';

export const connectionSchema = z.object({
	serverAddress: z.string().trim().pipe(z.hostname('Enter a hostname or IP address (no port)')),
	portNum: z.coerce
		.number('Port must be a number')
		.int('Port must be a whole number')
		.min(1, PORT_RANGE_MESSAGE)
		.max(65535, PORT_RANGE_MESSAGE),
	password: z.string(),
	slotName: z
		.string()
		.trim()
		.min(1, 'Slot name is required')
		.max(16, 'Slot names cannot be more than 16 characters')
});

export type ConnectionFormValues = Record<keyof z.input<typeof connectionSchema>, string>;
export type ConnectionDetails = z.output<typeof connectionSchema>;
export type ConnectionFormErrors = Partial<Record<keyof ConnectionFormValues, string[]>>;
