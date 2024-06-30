import type { NextRequest, NextResponse } from 'next/server';

function handler(req: NextResponse, res: NextRequest): void {
	console.log(req);
}

export { handler as POST, handler as GET };
