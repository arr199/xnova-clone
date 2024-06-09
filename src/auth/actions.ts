import { signIn } from './auth';

export async function signInWithGithub(): Promise<void> {
	'use server';

	await signIn('github', { redirectTo: '/home' });
}

export async function signInWithGoogle(): Promise<void> {
	'use server';

	await signIn('google', { redirectTo: '/home' });
}
