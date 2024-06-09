import { auth } from '@/auth/auth';
import { NextResponse } from 'next/server';

export default auth(req => {
	const authRoutes = ['/signin', '/signup'];

	if (req.auth == null && !authRoutes.includes(req.nextUrl.pathname as string)) {
		return NextResponse.redirect(new URL('/signin', req.nextUrl.origin as string));
	}
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
