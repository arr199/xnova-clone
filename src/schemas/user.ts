import * as z from 'zod';

export const userSchema = z.object({
	email: z
		.string({ message: 'Email must be a string' })
		.refine(value => !value.includes(' '), { message: 'No white spaces allow' })
		.transform(value => value.replace(/\s+/g, ''))
		.pipe(
			z
				.string()
				.min(1, { message: 'Email cannot be empty' })
				.max(10, { message: 'Email must be between 1 and 10 characters' })
		),
	password: z
		.string()
		.refine(value => value.includes(' '), { message: 'No white spaces allow' })
		.transform(value => value.replace(/\s+/g, ''))
		.pipe(
			z
				.string()
				.min(1, { message: 'password cannot be empty' })
				.max(10, { message: 'Password must be between 1 and 10 characters' })
		)
});
