import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Alert, Card, CardContent } from "@mui/material";
import { ask411, getFaqs, logAnalyticsEvent } from "../services/api";

const Assistance411 = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFaqs().then(setFaqs).catch(() => {});
  }, []);

  const handleAsk = async (e) => {
    e.preventDefault();
    setError("");
    setAnswer("");
    setLoading(true);
    try {
      const res = await ask411(question);
      setAnswer(res.answer);
      logAnalyticsEvent("411_question", { question, answer: res.answer });
    } catch {
      setError("No answer found. Please contact support or try a different question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>411 Assistance</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>Ask a question about wallets, web3, or BlockPages 411. Try our FAQ below!</Typography>
      <form onSubmit={handleAsk} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField
          label="Ask 411..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? "Asking..." : "Ask"}</Button>
      </form>
      {answer && <Alert severity="success">{answer}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Frequently Asked Questions</Typography>
        {faqs.map((faq, i) => (
          <Card key={faq._id || i} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">Q: {faq.question}</Typography>
              <Typography variant="body2">A: {faq.answer}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Assistance411;
