import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { users } from '../../../../lib/auth-db';

export async function GET() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');
  const userAddress = cookieStore.get('userAddress');

  if (userId) {
    // In a real app, fetch user from DB using userId
    const user = users.find(u => u.id === userId.value);
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
  }
  if (userAddress) {
    const user = users.find(u => u.walletAddress === userAddress.value);
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
  }
  return NextResponse.json({ user: null }, { status: 200 });
}

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete('userId');
  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
