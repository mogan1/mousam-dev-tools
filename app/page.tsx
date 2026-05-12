import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-5xl font-bold">
          Common Dev Tools
        </h1>

        <p className="mb-10 text-lg text-slate-600">
          Fast developer utilities for everyday tasks.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <Link
            href="/json-formatter"
            className="rounded-3xl bg-white p-6 shadow transition hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold">
              JSON Formatter
            </h2>

            <p className="mt-2 text-slate-500">
              Format, validate and minify JSON instantly.
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}