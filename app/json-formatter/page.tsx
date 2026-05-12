"use client";

import Link from "next/link";
import { useState } from "react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      setError("");

      const parsed = JSON.parse(input);

      const formatted = JSON.stringify(
        parsed,
        null,
        2
      );

      setOutput(formatted);
    } catch {
      setError("Invalid JSON format");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      setError("");

      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed));
    } catch {
      setError("Invalid JSON format");
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-black"
        >
          ← Back to tools
        </Link>

        <h1 className="mb-2 text-4xl font-bold">
          JSON Formatter
        </h1>

        <p className="mb-8 text-slate-600">
          Format, validate and minify JSON instantly.
        </p>

        <div className="rounded-3xl bg-white p-6 shadow-lg">

          <div className="grid gap-6 lg:grid-cols-2">

            <div>
              <label className="font-semibold">
                Input JSON
              </label>

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder='{"name":"Mousam"}'
                className="mt-2 h-[450px] w-full rounded-2xl border p-4 font-mono text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">
                Formatted Output
              </label>

              <textarea
                readOnly
                value={output}
                className="mt-2 h-[450px] w-full rounded-2xl border bg-slate-50 p-4 font-mono text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={formatJson}
              className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90"
            >
              Prettify JSON
            </button>

            <button
              onClick={minifyJson}
              className="rounded-xl border px-5 py-3"
            >
              Minify JSON
            </button>

            <button
              onClick={copyOutput}
              className="rounded-xl border px-5 py-3"
            >
              {copied
                ? "Copied!"
                : "Copy Output"}
            </button>

            <button
              onClick={clearAll}
              className="rounded-xl border px-5 py-3"
            >
              Clear
            </button>
          </div>

          {error && (
            <p className="mt-4 text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}