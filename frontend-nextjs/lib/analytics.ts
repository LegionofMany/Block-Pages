// Analytics logic
export async function fetchWalletAnalytics(_address: string) {
	// Simulate fetching analytics data
	return {
		txCount: 42,
		flaggedCount: 2,
		rating: 4.5,
		history: [1, 2, 3, 4, 5],
	};
}

export async function fetchAdminAnalytics() {
	// Simulate admin analytics data
	return {
		eventTypes: ["search", "flag", "rate", "donate"],
		eventCounts: [100, 20, 30, 10],
		topWallets: ["0x123...", "0x456..."],
	};
}
