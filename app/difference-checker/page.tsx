"use client";

import { useState } from "react";
import Link from "next/link";

function diffLines(a: string, b: string) {
    const aLines = a.split("\n");
    const bLines = b.split("\n");

    const max = Math.max(aLines.length, bLines.length);
    const result = [];

    for (let i = 0; i < max; i++) {
        const lineA = aLines[i];
        const lineB = bLines[i];

        if (lineA === lineB) {
            result.push({
                type: "same",
                a: lineA,
                b: lineB,
            });
        } else if (lineA === undefined) {
            result.push({
                type: "added",
                b: lineB,
            });
        } else if (lineB === undefined) {
            result.push({
                type: "removed",
                a: lineA,
            });
        } else {
            result.push({
                type: "changed",
                a: lineA,
                b: lineB,
            });
        }
    }

    return result;
}

export default function DiffPage() {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");
    const [result, setResult] = useState<any[]>([]);

    const compare = () => {
        setResult(diffLines(left, right));
    };

    const clearAll = () => {
        setLeft("");
        setRight("");
        setResult([]);
    };

    return (
        <main className="min-h-screen bg-[#FFF8E8] p-8">

            <div className="mx-auto max-w-6xl">

                <Link
                    href="/"
                    className="text-sm text-slate-600 hover:text-black"
                >
                    ← Back to tools
                </Link>

                <h1 className="mt-6 text-4xl font-semibold text-[#5A3B2A]">
                    Diff Checker
                </h1>

                <p className="mt-3 text-slate-600">
                    Compare text, code, logs, or configs side by side.
                </p>

                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                {/* Inputs */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <textarea
                        value={left}
                        onChange={(e) =>
                            setLeft(e.target.value)
                        }
                        placeholder="Original text"
                        className="h-64 w-full rounded-xl border bg-white p-4 font-mono text-sm"
                    />

                    <textarea
                        value={right}
                        onChange={(e) =>
                            setRight(e.target.value)
                        }
                        placeholder="Modified text"
                        className="h-64 w-full rounded-xl border bg-white p-4 font-mono text-sm"
                    />

                </div>

                <div className="mt-4 flex gap-3">
                    <button
                        onClick={compare}
                        className="rounded-xl bg-[#5A3B2A] px-5 py-2 text-white hover:bg-[#CC7A00]"
                    >
                        Compare
                    </button>

                    <button
                        onClick={clearAll}
                        className="rounded-xl border px-5 py-2"
                    >
                        Clear
                    </button>
                </div>

                {/* Output */}
                {result.length > 0 && (
                    <div className="mt-10 space-y-2">

                        {result.map((line, idx) => (
                            <div
                                key={idx}
                                className={`rounded-lg p-2 font-mono text-sm border ${line.type === "same"
                                    ? "bg-white"
                                    : line.type === "added"
                                        ? "bg-green-50 border-green-200"
                                        : line.type === "removed"
                                            ? "bg-red-50 border-red-200"
                                            : "bg-pink-50 border-pink-200"
                                    }`}
                            >
                                <div className="grid grid-cols-2 gap-4">

                                    <div className="text-red-600">
                                        {line.a ?? ""}
                                    </div>

                                    <div className="text-green-600">
                                        {line.b ?? ""}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

                </div>

            </div>
        </main>
    );
}