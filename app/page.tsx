"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trendStrength, setTrendStrength] = useState<"Very Very Low" | "Very Low" | "Low" | "Moderate" | "High" | "Very High" | "Exploding" | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [trendStatus, setTrendStatus] = useState<"Rising" | "Peaking" | "Declining" | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [shareableInsight, setShareableInsight] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [detectedHoursAgo, setDetectedHoursAgo] = useState<number | null>(null);

  const emergingTrends = [
    { name: "Quantum Computing Breakthroughs", category: "Technology" },
    { name: "Sustainable Fashion Movement", category: "Lifestyle" },
    { name: "Decentralized Social Networks", category: "Tech" },
    { name: "Plant-Based Nutrition Focus", category: "Health" },
    { name: "Remote Work Tools Evolution", category: "Business" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    }
  }, []);

  const insights = [
    "Creators entering early may benefit from lower competition.",
    "Brands should validate demand before investing heavily.",
    "Opportunity window may be closing as interest grows.",
    "Early adopters have advantage in content creation.",
    "Market research recommended before product launch.",
  ];

  const shareableTemplates = [
    "Early signals suggest {topic} are entering a rapid growth phase.",
    "Trend analysis indicates {topic} is experiencing significant momentum.",
    "Data shows {topic} is gaining traction across multiple platforms.",
    "Emerging patterns suggest {topic} may be approaching a tipping point.",
    "Recent signals point to growing interest in {topic}.",
  ];

  useEffect(() => {
    if (text) {
      setLoading(true);
      const timer = setTimeout(() => {
        const strengths: ("Very Very Low" | "Very Low" | "Low" | "Moderate" | "High" | "Very High" | "Exploding")[] = ["Very Very Low", "Very Low", "Low", "Moderate", "High", "Very High", "Exploding"];
        const statuses: ("Rising" | "Peaking" | "Declining")[] = ["Rising", "Peaking", "Declining"];
        const selectedStrength = strengths[Math.floor(Math.random() * 7)];
        const selectedStatus = statuses[Math.floor(Math.random() * 3)];
        const template = shareableTemplates[Math.floor(Math.random() * shareableTemplates.length)];
        const hoursAgo = isLoggedIn 
          ? Math.floor(Math.random() * (4 - 1 + 1)) + 1
          : Math.floor(Math.random() * (24 - 12 + 1)) + 12;
        setTrendStrength(selectedStrength);
        setConfidenceScore(Math.floor(Math.random() * (90 - 55 + 1)) + 55);
        setTrendStatus(selectedStatus);
        setInsight(insights[Math.floor(Math.random() * insights.length)]);
        setShareableInsight(template.replace("{topic}", text));
        setDetectedHoursAgo(hoursAgo);
        setCopied(false);
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
      setTrendStrength(null);
      setConfidenceScore(null);
      setTrendStatus(null);
      setInsight(null);
      setShareableInsight(null);
      setDetectedHoursAgo(null);
      setCopied(false);
    }
  }, [text]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Trend Project
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  A universal trend-prediction engine for the internet
          </p>
        </div>
              <div className="flex gap-3">
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Login
                </a>
                <a
                  href="/pricing"
                  className="px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Pricing
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full max-w-md">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            🔍 Search Topics
            </label>
            <input
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              placeholder="Enter a topic (e.g. AI, fitness, crypto)"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md mt-4">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
              Latest Emerging Trends
            </h2>
            <div className="flex flex-col gap-3">
              {emergingTrends.map((trend, index) => {
                const hoursAgo = isLoggedIn 
                  ? (index % 4) + 1
                  : (index % 13) + 12;
                return (
                  <div key={index} className="flex flex-col gap-2 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-black dark:text-zinc-50">
                          {trend.name}
                        </span>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400">
                          {trend.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Detected {hoursAgo} {hoursAgo === 1 ? "hour" : "hours"} ago
                      </p>
                      {!isLoggedIn && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-500">
                          🔒 Premium users were notified earlier
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {text && (
            <>
              {loading ? (
                <div className="flex flex-col gap-3 w-full max-w-md mt-2 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    Analyzing trends...👀
                  </p>
                </div>
              ) : (
                <>
                  {trendStrength && trendStatus && (
                    <div className="flex flex-col gap-5 w-full max-w-md mt-2">
                      {!isLoggedIn ? (
                        <div className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 opacity-50">
                          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                            Trend Summary
                          </h2>
                          <div className="flex items-center justify-center py-8 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-base text-zinc-600 dark:text-zinc-400">
                              🔒 Upgrade to unlock full trend analysis
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                            Trend Summary
                          </h2>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Topic:</span>
                              <span className="text-sm font-semibold text-black dark:text-zinc-50">{text}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Trend Strength:</span>
                              <span className="text-sm font-semibold text-black dark:text-zinc-50">{trendStrength}</span>
                              <span className="text-sm">
                                {trendStrength === "Very Very Low" && "🔻 🔻 🔻"}
                                {trendStrength === "Very Low" && "🔻 🔻"}
                                {trendStrength === "Low" && "🔻"}
                                {trendStrength === "Moderate" && "🟡"}
                                {trendStrength === "High" && "🟢"}
                                {trendStrength === "Very High" && "🟢 🟢"}
                                {trendStrength === "Exploding" && "🟢 🟢 🟢"}
                              </span>
                              {(trendStrength === "Exploding" || trendStrength === "Very High") && (
                                <span className="text-xs px-2 py-1 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded border border-orange-200 dark:border-orange-800">
                                  🔥 Spiking
                                </span>
                              )}
                              {(trendStrength === "Very Very Low" || trendStrength === "Very Low") && (
                                <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">
                                  📉 Cooling
                                </span>
                              )}
                            </div>
                            {confidenceScore !== null && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Confidence:</span>
                                <span className="text-sm font-semibold text-black dark:text-zinc-50">{confidenceScore}%</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Trend Status:</span>
                              <span className="text-sm font-semibold text-black dark:text-zinc-50">{trendStatus}</span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 italic pt-2 border-t border-zinc-200 dark:border-zinc-700">
                              {trendStatus === "Rising" && "Early signals show accelerating interest across platforms."}
                              {trendStatus === "Peaking" && "Interest is high but may be nearing saturation."}
                              {trendStatus === "Declining" && "Signals suggest interest may be cooling."}
                            </p>
                            {detectedHoursAgo !== null && (
                              <div className="flex flex-col gap-1 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                  Detected {detectedHoursAgo} {detectedHoursAgo === 1 ? "hour" : "hours"} ago
                                </p>
                                {!isLoggedIn && (
                                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                    🔒 Premium users were notified earlier
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {isLoggedIn && insight && (
                        <div className="flex flex-col gap-2 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                          <h3 className="text-sm font-semibold text-black dark:text-zinc-50">
                            Why this matters
                          </h3>
                          <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                            {insight}
                          </p>
                        </div>
                      )}

                      {isLoggedIn && shareableInsight && (
                        <div className="flex flex-col gap-3 p-5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                          <h3 className="text-sm font-semibold text-black dark:text-zinc-50">
                            Shareable Insight
                          </h3>
                          <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                            {shareableInsight}
                          </p>
                          <button
                            onClick={async () => {
                              if (shareableInsight) {
                                await navigator.clipboard.writeText(shareableInsight);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }
                            }}
                            className="self-start px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
                          >
                            {copied ? "Copied ✓" : "Copy Insight"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
