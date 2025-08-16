import React, { useState } from "react";
import { searchWallets } from "../lib/meilisearch";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const hits = await searchWallets(query);
      setResults(hits);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search wallets"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ marginLeft: 8 }} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        {results.length > 0 && (
          <ul>
            {results.map((wallet, i) => (
              <li key={i} style={{ padding: 4, borderBottom: "1px solid #eee" }}>
                {wallet.address} {wallet.aliases ? `(${wallet.aliases.join(", ")})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
