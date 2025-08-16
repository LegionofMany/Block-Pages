import MeiliSearch from "meilisearch";

const client = new MeiliSearch({ host: process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://localhost:7700" });
const index = client.index("wallets");

export async function searchWallets(query: string) {
	const result = await index.search(query, { limit: 10 });
	return result.hits;
}
