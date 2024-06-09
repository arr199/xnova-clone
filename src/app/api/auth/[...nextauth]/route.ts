import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

async function handler(req: NextRequest): Promise<NextResponse> {
	unstable_noStore();

	// get the route
	const url = req.url.split('/').at(-1);
	if (url === 'signout') {
		cookies().set('session', '', { expires: new Date(0) });
		return NextResponse.json({ success: 'Signout successful' });
	}
	if (url === 'getUser') {
		const session = jwt.decode(cookies().get('session') as string, { complete: true });

		return NextResponse.json({ session });
	}
	return NextResponse.json({ error: 'Invalid route' });
}

export { handler as GET, handler as POST };
