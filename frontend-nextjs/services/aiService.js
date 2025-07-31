// AI Service using OpenAI API (Next.js convention)
export async function askAI(prompt) { 
  const res = await fetch("/api/ai/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) {
    throw new Error("AI API error");
  }
  return await res.json();
}
