import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({
		message: 'Mock dashboard data',
		stats: { users: 123, workouts: 456 },
	});
}
