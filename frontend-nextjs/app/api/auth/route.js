// C:\Users\user\Desktop\BlockPages\frontend-nextjs\app\api\auth\route.js

// In-memory "database" for demonstration purposes.
// In a real application, this would be replaced with a proper database (e.g., MongoDB, PostgreSQL).
const users = [];

export async function POST(req) {
  const { type, email, password, walletAddress } = await req.json();

  if (type === 'email-login') {
    // Handle email and password login
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      return new Response(JSON.stringify({ message: 'Login successful', user: { email: user.email } }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }
  } else if (type === 'metamask-login') {
    // Handle MetaMask login
    // In a real application, you would verify the signature against the walletAddress
    const user = users.find(u => u.walletAddress === walletAddress);
    if (user) {
      return new Response(JSON.stringify({ message: 'MetaMask login successful', user: { walletAddress: user.walletAddress } }), { status: 200 });
    } else {
      // For simplicity, if user doesn't exist, register them with their walletAddress
      users.push({ walletAddress });
      return new Response(JSON.stringify({ message: 'MetaMask user registered and logged in', user: { walletAddress } }), { status: 201 });
    }
  } else if (type === 'register') {
    // Handle user registration
    if (users.some(u => u.email === email)) {
      return new Response(JSON.stringify({ message: 'User with this email already exists' }), { status: 409 });
    }
    users.push({ email, password });
    return new Response(JSON.stringify({ message: 'Registration successful', user: { email } }), { status: 201 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid request type' }), { status: 400 });
  }
}

// You can add other HTTP methods (GET, PUT, DELETE) as needed.
