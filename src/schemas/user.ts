import * as z from 'zod';

export const userSchema = z.object({
	email: z
		.string({ message: 'Email must be a string' })
		.refine(value => !value.includes(' '), { message: 'No white spaces allowed' })
		.transform(value => value.replace(/\s+/g, ''))
		.pipe(
			z
				.string()
				.min(1, { message: 'Email can not be empty' })
				.max(10, { message: 'Email must be between 1 and 10 characters' })
		),
	password: z
		.string()
		.refine(value => !value.includes(' '), { message: 'No white spaces allowed' })
		.transform(value => value.replace(/\s+/g, ''))
		.pipe(
			z
				.string()
				.min(1, { message: 'Password must be between 1 and 20 characters' })
				.max(20, { message: 'Password must be between 1 and 20 characters' })
		)
});
