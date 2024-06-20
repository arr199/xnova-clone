import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(req: NextRequest): any {
	console.log('MIDDLEWARE');
	const session = req.cookies.get('session') ?? null;
	const authUrls = ['/signin', '/signup', '/signIn'];

	if (session === null && !authUrls.includes(req.nextUrl.pathname)) {
		console.log('HERE');
		return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
	}

	if (session !== null && authUrls.includes(req.nextUrl.pathname)) {
		console.log('REDIRECTING TO HOME');
		return NextResponse.redirect(new URL('/home', req.nextUrl.origin));
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
