import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await res.json();
      const botMsg = { from: "bot", text: data.response };
      setMessages((m) => [...m, botMsg]);
    } catch (e) {
      setMessages((m) => [...m, { from: "bot", text: "Something went wrong." }]);
    }

    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>AI Chat</h1>
      <div ref={containerRef} style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.from}:</b> {m.text}</div>
        ))}
        {loading && <div><i>bot is typing…</i></div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: 8 }}
          placeholder="Say something…"
        />
        <button onClick={sendMessage} disabled={!input.trim() || loading}>Send</button>
      </div>
    </div>
  );
}
