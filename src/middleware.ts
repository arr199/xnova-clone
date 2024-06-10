import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(req: NextRequest): any {
	console.log('MIDDLEWARE');
	const session = req.cookies.get('session') ?? null;

	if (session === null && req.nextUrl.pathname !== '/signin') {
		return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
	}

	if (session !== null && req.nextUrl.pathname === '/signin') {
		return NextResponse.redirect(new URL('/', req.nextUrl.origin));
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};
