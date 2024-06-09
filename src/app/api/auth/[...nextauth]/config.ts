import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { GoogleProfile } from 'next-auth/providers/google';
import type { GitHubProfile } from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import { verifyGoogleUserInDatabase } from './googleProfile';
import { verifyGithubUserInDatabase } from './gitHubProfile';
import { supabase } from '@/supabase/client';

export const options: NextAuthConfig = {
	logger: {
		error: console.error,
		warn: console.warn,
		verbose: console.log,
		debug: console.log
	},
	basePath: '/api/auth',
	providers: [
		Github({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
			async profile(profile: GitHubProfile, tokens: any): Promise<any> {
				// console.log('-----------------');
				// console.log('GITHUB PROFILE');
				// console.log(tokens);
				// console.log(profile);
				// console.log('-----------------');

				return await verifyGithubUserInDatabase(profile);
			}
		}),
		Google({
			clientId: process.env.GOOGLE_ID ?? '',
			clientSecret: process.env.GOOGLE_SECRET ?? '',
			async profile(profile: GoogleProfile, tokens: any): Promise<any> {
				// console.log('-----------------');
				// console.log('GITHUB PROFILE');
				// console.log(tokens);
				// console.log(profile);
				// console.log('-----------------');

				return await verifyGoogleUserInDatabase(profile);
			}
		}),
		Credentials({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'admin' },
				password: { label: 'Password', type: 'password', placeholder: 'admin' }
			},
			async authorize(credentials, req): Promise<any> {
				// THIS IS WHERE YOU WOULD ADD YOUR OWN AUTHENTICATION LOGIC
				// FOR EXAMPLE, CHECKING USERNAME AND PASSWORD AGAINST A DATABASE
				const user = { name: 'admin', password: 'admin' };

				if (
					user.name === credentials?.username &&
					user.password === credentials?.password
				) {
					console.log(credentials?.username);
					console.log(credentials?.password);
					return user;
				}
			}
		})
	],
	callbacks: {
		async session({ token, user, session }) {
			const { data, error } = await supabase
				.from('users')
				.select()
				.eq('email', token.email as string)
				.select();
			console.log('ERROR IN SESSION CALLBACK SUPABASE: ', error);
			session.user.id = data?.[0]?.id ?? '';
			return session;
		}
	},
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true
			}
		}
	}
};
