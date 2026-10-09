import { z } from 'zod';

const PORT_RANGE_MESSAGE = 'Port must be between 1 and 65535';

export const connectionSchema = z.object({
	hostName: z
		.string('Hostname is required')
		.trim()
		.pipe(z.hostname('Enter a hostname or IP address (no port)')),
	portNum: z
		.string('Port is required')
		.pipe(
			z.coerce
				.number<string>('Port must be a number')
				.int('Port must be a whole number')
				.min(1, PORT_RANGE_MESSAGE)
				.max(65535, PORT_RANGE_MESSAGE)
		),
	password: z
		.string()
		.nullable()
		.transform((password) => password ?? ''),
	slotName: z
		.string('Slot name is required')
		.trim()
		.min(1, 'Slot name is required')
		.max(16, 'Slot names cannot be more than 16 characters')
});

export type ConnectionFormValues = Record<keyof z.input<typeof connectionSchema>, string | null>;

export const emptyConnectionValues = (): ConnectionFormValues => ({
	hostName: null,
	portNum: null,
	password: null,
	slotName: null
});
export type ConnectionDetails = z.output<typeof connectionSchema>;
export type ConnectionFormErrors = Partial<Record<keyof ConnectionFormValues, string[]>>;
