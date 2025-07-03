// File: frontend/pages/index.tsx
// This is the main frontend page written in TypeScript for the Next.js app

import { useState } from "react";

// Define the expected structure of the API response
interface ChatResponse {
  response: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Send the user message to the backend and handle the response
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!res.ok) throw new Error("Failed to fetch response");
      const data: ChatResponse = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Simple AI Chat</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="w-full max-w-md p-2 border rounded mb-4"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
      {response && (
        <div className="mt-6 w-full max-w-md bg-gray-100 p-4 rounded shadow">
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
