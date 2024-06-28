'use server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabase/client';
import { ERROR } from '../utils/errors';
import bcrypt from 'bcrypt';

export interface signInWithCredentialsResponse {
	error?: string;
	success?: string;
}

export async function signInWithCredentials(prevState: FormData, formdata: FormData): Promise<any> {
	console.log('SIGN IN WITH CREDENTIALS');
	const { email, password } = Object.fromEntries(formdata) as Record<string, string>;

	if (email === null || password === null) {
		return { error: ERROR.INVALID_CREDENTIALS };
	}

	//  VALIDATE INPUT
	if (typeof email !== 'string' && String(email).length > 30) {
		return { error: ERROR.INVALID_EMAIL };
	}

	if (typeof password !== 'string' && String(password).length > 30) {
		return { error: ERROR.INVALID_PASSWORD };
	}

	try {
		// GET THE USER IN THE DATABASE
		const { data, error } = await supabase.from('users').select('*').eq('email', email);

		if (error !== null) {
			return { error: ERROR.SERVER_ERROR };
		}

		if (data?.length <= 0) {
			return { error: ERROR.USER_NOT_FOUND };
		}

		// CHECK PASSWORD
		const user = data[0];
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return { error: ERROR.INVALID_CREDENTIALS };
		}
		// CREATE THE SESSION
		const session = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? '', {
			expiresIn: '10d'
		});

		const expires = new Date(Date.now() + 1000 * 1000);
		cookies().set('session', session, { expires, httpOnly: true });

		return { success: 'success' };
	} catch (error) {
		return { error: ERROR.SERVER_ERROR };
	}
}

export async function signUpWithCredentials(prevState: FormData, formdata: FormData): Promise<any> {
	const { email = null, password = null } = Object?.fromEntries(formdata) as Record<string, string>;

	if (email === null || password === null) {
		return { error: ERROR.INVALID_CREDENTIALS };
	}

	//  VALIDATE INPUT
	if (typeof email !== 'string' && String(email).length > 30) {
		return { error: ERROR.INVALID_EMAIL };
	}

	if (typeof password !== 'string' && String(password).length > 30) {
		return { error: ERROR.INVALID_PASSWORD };
	}

	// CHECK IF EMAIL EXISTS
	try {
		const { data, error } = await supabase.from('users').select('*').eq('email', email);

		if (error !== null) {
			console.log(error);
			return { error: ERROR.SERVER_ERROR };
		}

		if (data?.length > 0) {
			console.log(data);
			return { error: ERROR.EMAIL_EXISTS };
		}
	} catch (error) {
		console.log(error);
		return { error: ERROR.SERVER_ERROR };
	}

	// INSERT USER
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try {
		const { error } = await supabase.from('users').insert({ email, password: hashedPassword });

		if (error !== null) {
			console.log(error);
			return { error: ERROR.SERVER_ERROR };
		}

		return { success: 'success' };
	} catch (error) {
		console.log(error);
		return { error: ERROR.SERVER_ERROR };
	}
}

export async function getSession(): Promise<any> {
	const session = cookies().get('session');
	return session;
}

export async function signOut(): Promise<void> {
	cookies().set('session', '', { expires: new Date(0) });
}
