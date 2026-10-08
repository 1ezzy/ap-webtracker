import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	serverAddress: z.union([z.url(), z.ipv4()]).default('archipelago.gg'),
	portNum: z.number().min(10000).max(99999).default(12345),
	password: z.string().optional(),
	slotName: z.string().min(1).max(15)
});

export const load = async () => {
	const form = await superValidate(zod4(schema));

	return { form };
};
