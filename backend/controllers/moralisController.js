import moralisService from "../services/moralisService.js";

const moralisController = {
  async getBalance(req, res) {
    try {
      const { wallet } = req.params;
      const { chain } = req.query;
      const result = await moralisService.getBalance(wallet, chain || "eth");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getTransactionHistory(req, res) {
    try {
      const { wallet } = req.params;
      const { chain } = req.query;
      const result = await moralisService.getTransactionHistory(wallet, chain || "eth");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getGasPrice(req, res) {
    try {
      const { chain } = req.query;
      const result = await moralisService.getGasPrice(chain || "eth");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async estimateTransactionFee(req, res) {
    try {
      const { from, to, amount, chain } = req.query;
      const result = await moralisService.estimateTransactionFee(from, to, amount, chain || "eth");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getBlockData(req, res) {
    try {
      const { blockNumber } = req.params;
      const { chain } = req.query;
      const result = await moralisService.getBlockData(blockNumber, chain || "eth");
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default moralisController;
