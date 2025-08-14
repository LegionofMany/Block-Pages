// C:\Users\user\Desktop\BlockPages\frontend-nextjs\app\api\auth\route.js

// In-memory "database" for demonstration purposes.
// In a real application, this would be replaced with a proper database (e.g., MongoDB, PostgreSQL).
import { NextResponse } from 'next/server';
import { users, userIdCounter, incrementUserIdCounter } from '../../../lib/auth-db';

export async function POST(req) {
  const { type, name, email, password, walletAddress } = await req.json();

  if (type === 'email-login') {
    // Handle email and password login
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const response = NextResponse.json({ message: 'Login successful', user }, { status: 200 });
      response.cookies.set('userId', user.id, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
      return response;
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } else if (type === 'metamask-login') {
    // Handle MetaMask login
    // In a real application, you would verify the signature against the walletAddress
    let user = users.find(u => u.walletAddress === walletAddress);
    if (user) {
      const response = NextResponse.json({ message: 'MetaMask login successful', user }, { status: 200 });
      response.cookies.set('userId', user.id, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
      return response;
    } else {
      // For simplicity, if user doesn't exist, register them with their walletAddress
      const newUser = { id: userIdCounter, name: 'MetaMask User', walletAddress };
      users.push(newUser);
      incrementUserIdCounter();
      const response = NextResponse.json({ message: 'MetaMask user registered and logged in', user: newUser }, { status: 201 });
      response.cookies.set('userId', newUser.id, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
      return response;
    }
  } else if (type === 'register') {
    // Handle user registration
    let user = users.find(u => u.email === email);
    if (user) {
      // If user already exists, treat as login and redirect to home
      const response = NextResponse.json({ message: 'User already exists, logging in', user }, { status: 200 });
      response.cookies.set('userId', user.id, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
      return response;
    }
    const newUser = { id: userIdCounter, name, email, password };
    users.push(newUser);
    incrementUserIdCounter();
    const response = NextResponse.json({ message: 'Registration successful', user: newUser }, { status: 201 });
    response.cookies.set('userId', newUser.id, { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    return response;
  } else {
    return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}


// You can add other HTTP methods (GET, PUT, DELETE) as needed.
