import express from "express";
import request from "supertest";
import walletRoutes from "./routes/walletRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/wallets", walletRoutes);

describe("Wallet API", () => {
  it("should return 400 for invalid wallet address", async () => {
    const res = await request(app).get("/api/wallets/invalidaddress");
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
  });
});
