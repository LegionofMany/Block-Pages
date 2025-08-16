

import { rateHandler } from "../lib/handlers/walletRate";
import { flagHandler } from "../lib/handlers/walletFlag";

describe("Wallet API endpoints", () => {
  it("should reject invalid rating input", async () => {
    const res = await rateHandler("0x123", 10);
    expect(res.status).toBe(400);
  });

  it("should accept valid rating input", async () => {
    const res = await rateHandler("0x123", 5);
    expect(res.success).toBe(true);
    expect(res.address).toBe("0x123");
    expect(res.rating).toBe(5);
  });

  it("should reject invalid flag input", async () => {
    const res = await flagHandler("0x123", "no");
    expect(res.status).toBe(400);
  });

  it("should accept valid flag input", async () => {
    const res = await flagHandler("0x123", "suspicious");
    expect(res.success).toBe(true);
    expect(res.address).toBe("0x123");
    expect(res.reason).toBe("suspicious");
  });
});
