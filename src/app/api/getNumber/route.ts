import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

function handler(): NextResponse<number> {
	const number = Math.random();

	return NextResponse.json(number);
}

export { handler as GET };
