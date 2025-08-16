// Testing utilities for frontend and backend

export function mockWallet(address: string) {
	return {
		address,
		txCount: Math.floor(Math.random() * 100),
		flaggedCount: Math.floor(Math.random() * 5),
		rating: Math.random() * 5,
	};
}

export function mockDonation(address: string) {
	return {
		address,
		amount: Math.floor(Math.random() * 1000),
		date: new Date().toISOString(),
	};
}

export function mockFlag(address: string) {
	return {
		address,
		reason: "Suspicious activity",
		date: new Date().toISOString(),
	};
}
