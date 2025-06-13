import React, { useEffect, useState } from "react";
import { getFaqs, addFaq, updateFaq, deleteFaq } from "../services/api";
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminFaq() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadFaqs = async () => {
    try {
      setFaqs(await getFaqs());
    } catch {
      setError("Failed to load FAQs");
    }
  };
  useEffect(() => { loadFaqs(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      if (editing) {
        await updateFaq(editing, form);
        setSuccess("FAQ updated");
      } else {
        await addFaq(form);
        setSuccess("FAQ added");
      }
      setForm({ question: "", answer: "" });
      setEditing(null);
      loadFaqs();
    } catch {
      setError("Failed to save FAQ");
    }
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditing(faq._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFaq(id);
      setSuccess("FAQ deleted");
      loadFaqs();
    } catch {
      setError("Failed to delete FAQ");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin FAQ Management</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <TextField label="Question" name="question" value={form.question} onChange={handleChange} sx={{ flex: 2 }} />
        <TextField label="Answer" name="answer" value={form.answer} onChange={handleChange} sx={{ flex: 3 }} />
        <Button type="submit" variant="contained" color="primary">{editing ? "Update" : "Add"}</Button>
      </form>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {faqs.map(faq => (
        <Card key={faq._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1">Q: {faq.question}</Typography>
            <Typography variant="body2">A: {faq.answer}</Typography>
            <Button size="small" onClick={() => handleEdit(faq)}>Edit</Button>
            <IconButton onClick={() => handleDelete(faq._id)}><DeleteIcon /></IconButton>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
