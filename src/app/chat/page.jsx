"use client";

import { useState } from "react";
import { askGemini } from "./server";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    // send new question + old chat to server
    const answer = await askGemini(input, history);

    setResponse(answer);

    // save conversation in browser memory
    setHistory(prev =>
      prev.concat({ question: input, answer: answer })
    );

    setLoading(false);
  };

  return (
    <div className="bg-green-400 min-h-screen ">
    <div style={{ padding: "60px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI..."
      />

      <button  onClick={handleSubmit} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <p>{response}</p>

      <ul>
        {history.map((item, i) => (
          <li key={i}>
            <b>You:</b> {item.question}<br />
            <b>AI:</b> {item.answer}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}