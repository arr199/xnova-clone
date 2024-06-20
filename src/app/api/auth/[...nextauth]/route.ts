import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

async function handler(req: NextRequest): Promise<NextResponse> {
	unstable_noStore();
	// GET THE SESSION TOKEN
	const sessionToken = cookies().get('session')?.value ?? '';
	// console.log(sessionToken);

	// GET AUTH ENDPOINT
	const url = req.url.split('/').at(-1);
	if (url === 'signOut') {
		cookies().set('session', '', { expires: new Date(0) });
		return NextResponse.json<AuthResponse>({ success: 'Sign out successfully' });
	}
	if (url === 'getUser') {
		const session = jwt.verify(sessionToken, process.env.JWT_SECRET ?? '');
		return NextResponse.json<AuthResponse>({ session, success: 'User found' });
	}
	return NextResponse.json({ error: 'Invalid route' });
}

export { handler as GET, handler as POST };

export interface AuthResponse {
	session?: any;
	success?: string;
	error?: string;
}
