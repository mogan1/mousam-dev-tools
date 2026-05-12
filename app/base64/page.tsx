"use client";

import { useState } from "react";
import Link from "next/link";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    try {
      setError("");
      const encoded = btoa(input);
      setOutput(encoded);
    } catch {
      setError("Failed to encode text");
    }
  };

  const decode = () => {
    try {
      setError("");
      const decoded = atob(input);
      setOutput(decoded);
    } catch {
      setError("Invalid Base64 string");
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-900 p-8">

      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="text-sm text-slate-600 hover:text-black"
        >
          ← Back to tools
        </Link>

        <h1 className="mt-6 text-4xl font-semibold">
          Base64 Encoder / Decoder
        </h1>

        <p className="mt-3 text-slate-600">
          Convert text to Base64 and decode it instantly.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          {/* Input */}
          <label className="font-medium">
            Input
          </label>

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Enter text or Base64 string"
            className="mt-2 h-48 w-full rounded-xl border p-4 font-mono"
          />

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">

            <button
              onClick={encode}
              className="rounded-xl bg-black px-5 py-2 text-white"
            >
              Encode
            </button>

            <button
              onClick={decode}
              className="rounded-xl border px-5 py-2"
            >
              Decode
            </button>

            <button
              onClick={clearAll}
              className="rounded-xl border px-5 py-2"
            >
              Clear
            </button>

          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-red-500">
              {error}
            </p>
          )}

          {/* Output */}
          <div className="mt-8">
            <label className="font-medium">
              Output
            </label>

            <textarea
              readOnly
              value={output}
              className="mt-2 h-48 w-full rounded-xl border bg-slate-50 p-4 font-mono"
            />

            {output && (
              <button
                onClick={copyOutput}
                className="mt-4 rounded-xl border px-5 py-2"
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}