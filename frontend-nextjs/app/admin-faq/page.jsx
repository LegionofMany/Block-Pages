"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFaqs, addFaq, updateFaq, deleteFaq } from "../../services/api";
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminFaq() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [user, setUser] = useState(null); // Replace with your auth logic
  const router = useRouter();

  // Simulate auth check (replace with real check, e.g. from context or API)
  useEffect(() => {
    // TODO: Replace with real authentication logic
    const isAuthenticated = true; // Set to false to test redirect
    setUser(isAuthenticated ? { role: "admin" } : null);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const showToast = (message, type = "info") => setToast({ message, type });

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
        showToast("FAQ updated", "success");
      } else {
        await addFaq(form);
        setSuccess("FAQ added");
        showToast("FAQ added", "success");
      }
      setForm({ question: "", answer: "" });
      setEditing(null);
      loadFaqs();
    } catch {
      setError("Failed to save FAQ");
      showToast("Failed to save FAQ", "error");
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
      showToast("FAQ deleted", "success");
      loadFaqs();
    } catch {
      setError("Failed to delete FAQ");
      showToast("Failed to delete FAQ", "error");
    }
  };

  if (!user) return null;

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
      {toast.message && (
        <Alert severity={toast.type} sx={{ mt: 2 }} onClose={() => setToast({ message: "", type: "info" })}>
          {toast.message}
        </Alert>
      )}
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
