import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({
		message: 'Mock challenges data',
		challenges: [
			{ id: 1, name: '10K Steps', completed: false },
			{ id: 2, name: '5 Workouts', completed: true },
		],
	});
}
