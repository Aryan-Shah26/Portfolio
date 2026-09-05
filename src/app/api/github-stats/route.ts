import { NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/services/github';

export async function GET() {
  try {
    const stats = await getGitHubStats();
    return NextResponse.json(stats, stats.error ? { status: 503 } : undefined);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
