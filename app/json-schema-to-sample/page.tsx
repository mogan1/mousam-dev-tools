"use client";

import Link from "next/link";
import { useState } from "react";
import { faker } from "@faker-js/faker";

function generateFromSchema(schema: any): any {
    if (!schema) return null;

    // ENUM support
    if (schema.enum) {
        return faker.helpers.arrayElement(schema.enum);
    }

    switch (schema.type) {
        case "object": {
            const result: any = {};
            const props = schema.properties || {};
            const required = schema.required || [];

            for (const key in props) {
                result[key] = generateFromSchema(props[key]);
            }

            // ensure required fields exist
            for (const key of required) {
                if (!(key in result)) {
                    result[key] = generateFromSchema(props[key] || { type: "string" });
                }
            }

            return result;
        }

        case "array": {
            const itemSchema = schema.items || { type: "string" };
            const length = faker.number.int({ min: 1, max: 3 });

            return Array.from({ length }, () =>
                generateFromSchema(itemSchema)
            );
        }

        /* case "array": {
            const itemSchema = schema.items || { type: "string" };

            return Array.from({ length: count }, () =>
                generateFromSchema(itemSchema)
            );
        } */

        case "string": {
            const format = schema.format;

            switch (format) {
                case "email":
                    return faker.internet.email();

                case "uuid":
                    return faker.string.uuid();

                case "url":
                    return faker.internet.url();

                case "date":
                    return faker.date.recent().toISOString().split("T")[0];

                case "phone":
                case "phoneNumber":
                    return faker.phone.number();

                default:
                    return faker.lorem.word();
            }
        }

        case "integer": {
            return faker.number.int({
                min: schema.minimum ?? 1,
                max: schema.maximum ?? 1000
            });
        }

        case "number": {
            return faker.number.float({
                min: schema.minimum ?? 1,
                max: schema.maximum ?? 1000
            });
        }

        case "boolean":
            return faker.datatype.boolean();

        default:
            return null;
    }
}

export default function SchemaToJsonPage() {
    const [schema, setSchema] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [count, setCount] = useState(1);

    const generateSampleJson = () => {
        try {
            setError("");

            const parsedSchema = JSON.parse(schema);

            const result = Array.from({ length: count }, () =>
                generateFromSchema(parsedSchema)
            );

            setOutput(JSON.stringify(result, null, 2));
        } catch {
            setError("Invalid JSON schema");
            setOutput("");
        }
    };

    const copyOutput = async () => {
        await navigator.clipboard.writeText(
            output
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const clearAll = () => {
        setSchema("");
        setOutput("");
        setError("");
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
                    JSON Schema to JSON
                </h1>

                <p className="mb-8 text-slate-600">
                    Generate sample JSON from
                    JSON schema instantly.
                </p>

                <div className="rounded-3xl bg-white p-6 shadow-lg">

                    <div className="grid gap-6 lg:grid-cols-2">

                        <div>
                            <label className="font-semibold">
                                JSON Schema
                            </label>

                            <textarea
                                value={schema}
                                onChange={(e) =>
                                    setSchema(
                                        e.target.value
                                    )
                                }
                                placeholder='{"type":"object"}'
                                className="mt-2 h-[450px] w-full rounded-2xl border p-4 font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Generated JSON
                            </label>

                            <textarea
                                readOnly
                                value={output}
                                className="mt-2 h-[450px] w-full rounded-2xl border bg-slate-50 p-4 font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <label className="font-medium">
                            Records:
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={50}
                            value={count}
                            onChange={(e) =>
                                setCount(Number(e.target.value))
                            }
                            className="w-24 rounded-lg border p-2"
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <button
                            onClick={
                                generateSampleJson
                            }
                            className="rounded-xl bg-black px-5 py-3 text-white"
                        >
                            Generate JSON
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