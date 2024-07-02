'use server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabase/client';
import { ERROR, ServerError, ValidationError } from '../utils/errors';
import bcrypt from 'bcrypt';
import { userSchema } from '@/schemas/user';
import { RedirectType, redirect } from 'next/navigation';
import { url } from 'inspector';

export interface signInWithCredentialsResponse {
	error?: string;
	success?: string;
}
export interface signUpWithCredentialsResponse {
	error?: string;
	success?: string;
}

export async function signInWithCredentials(
	_: signInWithCredentialsResponse,
	formData: FormData
): Promise<signInWithCredentialsResponse> {
	console.log('SIGN IN WITH CREDENTIALS');
	const { email, password } = Object.fromEntries(formData) as Record<string, string>;

	try {
		// FIELDS VALIDATION WITH ZOD
		const fieldsData = userSchema.safeParse({ email, password });

		if (!fieldsData.success) {
			throw new ValidationError(ERROR.INVALID_CREDENTIALS);
		}

		// GET THE USER IN THE DATABASE
		const { data, error } = await supabase.from('users').select('*').eq('email', email);

		if (error !== null) {
			throw new ServerError(ERROR.SERVER_ERROR);
		}

		if (data?.length <= 0) {
			throw new ValidationError(ERROR.USER_NOT_FOUND);
		}

		// CHECK PASSWORD
		const user = data[0];
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			throw new ValidationError(ERROR.INVALID_PASSWORD);
		}
		// CREATE THE SESSION
		const session = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? '', {
			expiresIn: '10d'
		});

		const expires = new Date(Date.now() + 1000 * 1000);
		cookies().set('session', session, { expires, httpOnly: true });

		return { success: 'success' };
	} catch (error: any) {
		console.log(error);

		return { error: error.message };
	}
}

export async function signUpWithCredentials(
	_: signUpWithCredentialsResponse,
	formData: FormData
): Promise<signUpWithCredentialsResponse> {
	const { email = null, password = null } = Object?.fromEntries(formData) as Record<string, string>;

	// delay 2 sec
	await new Promise(resolve => setTimeout(resolve, 2000));
	try {
		const fieldsData = userSchema.safeParse({ email, password });

		if (!fieldsData.success) {
			throw new ValidationError(ERROR.INVALID_CREDENTIALS);
		}

		// CHECK IF EMAIL EXISTS
		const { data, error } = await supabase
			.from('users')
			.select('email')
			.eq('email', email as string);

		if (error !== null) {
			console.log(error);
			throw new ServerError(ERROR.SERVER_ERROR);
		}

		if (data?.length > 0) {
			console.log(data);
			throw new ValidationError(ERROR.EMAIL_EXISTS);
		}

		// INSERT USER

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password as string, saltRounds);
		const { error: insertError } = await supabase
			.from('users')
			.insert({ email: email as string, password: hashedPassword });

		if (insertError !== null) {
			console.log(insertError);
			throw new ServerError(ERROR.ERROR_CREATING_USER);
		}

		return { success: 'success' };
	} catch (error: any) {
		console.log(error);
		return { error: error.message };
	}
}

export async function getSession(): Promise<any> {
	const session = cookies().get('session');
	return session;
}

export async function signOut(): Promise<void> {
	cookies().set('session', '', { expires: new Date(0) });
}

export async function signInWithGoogle(): Promise<any> {
	// Google's OAuth 2.0 endpoint for requesting an access token
	console.log('SIGN IN WITH GOOGLE');

	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
	url.searchParams.append('client_id', process.env.GOOGLE_ID ?? '');
	url.searchParams.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI ?? '');
	url.searchParams.append('response_type', 'token');
	url.searchParams.append('scope', 'https://www.googleapis.com/auth/drive.metadata.readonly');
	// url.searchParams.append('include_granted_scopes', 'true');
	// url.searchParams.append('state', 'pass-throughvalue');
	redirect(url.toString(), RedirectType.push);
}
