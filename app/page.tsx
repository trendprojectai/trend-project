"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Trend Project
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A universal trend-prediction engine for the internet
          </p>
          <div className="flex flex-col gap-4 w-full max-w-md">
            <input
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter a topic (e.g. AI, fitness, crypto)"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                  Trend Preview
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Early signals suggest rising interest in: {text}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
