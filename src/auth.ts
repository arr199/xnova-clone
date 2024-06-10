import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function signInWithCredentials(formdata: FormData): Promise<any> {
	const username = formdata.get('username');
	const password = formdata.get('password');

	//  VALIDATE INPUT  AND CHECK DATABASE
	if (username !== 'admin' || password !== 'admin') {
		return { error: 'Invalid credentials' };
	}

	// CREATE THE SESSION
	const id = '1';
	const expires = new Date(Date.now() + 1000 * 1000);

	const session = { user: { username, id, expires } };
	const jwtSession = jwt.sign(session, process.env.JWT_SECRET ?? '', {
		algorithm: 'HS256'
	}) as string;
	cookies().set('session', jwtSession, { expires, httpOnly: true });
	return 'success';
}

export function getSession(): any {
	const session = cookies().get('session');
	return session;
}

export function signOut(): void {
	cookies().set('session', '', { expires: new Date(0) });
}

