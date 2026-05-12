"use client";

import { useState } from "react";
import Link from "next/link";

function base64UrlDecode(str: string) {
  try {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState("");

  const decodeJWT = () => {
    try {
      setError("");

      const parts = token.split(".");

      if (parts.length !== 3) {
        setError("Invalid JWT format");
        return;
      }

      const decodedHeader = base64UrlDecode(parts[0]);
      const decodedPayload = base64UrlDecode(parts[1]);

      if (!decodedHeader || !decodedPayload) {
        setError("Failed to decode JWT");
        return;
      }

      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch {
      setError("Invalid token");
    }
  };

  const getExpiryStatus = () => {
    if (!payload?.exp) return null;

    const now = Date.now() / 1000;

    return payload.exp > now ? "Valid" : "Expired";
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-8">

      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="text-sm text-slate-600 hover:text-black"
        >
          ← Back to tools
        </Link>

        <h1 className="mt-6 text-4xl font-semibold">
          JWT Decoder
        </h1>

        <p className="mt-3 text-slate-600">
          Decode JSON Web Tokens instantly in your browser.
        </p>

        {/* Input */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <label className="font-medium">
            JWT Token
          </label>

          <textarea
            value={token}
            onChange={(e) =>
              setToken(e.target.value)
            }
            placeholder="Paste JWT token here"
            className="mt-2 h-40 w-full rounded-xl border p-4 font-mono text-sm"
          />

          <button
            onClick={decodeJWT}
            className="mt-4 rounded-xl bg-black px-5 py-2 text-white"
          >
            Decode Token
          </button>

          {error && (
            <p className="mt-4 text-red-500">
              {error}
            </p>
          )}
        </div>

        {/* Output */}
        {header && payload && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {/* Header */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-semibold">
                Header
              </h2>

              <pre className="mt-3 text-sm">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-semibold">
                Payload
              </h2>

              <pre className="mt-3 text-sm">
                {JSON.stringify(payload, null, 2)}
              </pre>

              {payload.exp && (
                <p className="mt-4 text-sm">
                  Status:{" "}
                  <span className="font-semibold">
                    {getExpiryStatus()}
                  </span>
                </p>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}