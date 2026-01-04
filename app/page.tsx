"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremiumDev, setIsPremiumDev] = useState(false);
  const [trendStrength, setTrendStrength] = useState<"Very Very Low" | "Very Low" | "Low" | "Moderate" | "High" | "Very High" | "Exploding" | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [trendStatus, setTrendStatus] = useState<"Rising" | "Peaking" | "Declining" | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [shareableInsight, setShareableInsight] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [detectedHoursAgo, setDetectedHoursAgo] = useState<number | null>(null);
  const [accelerationRating, setAccelerationRating] = useState<"Slow" | "Rising" | "Exploding" | null>(null);
  const [breakoutWindow, setBreakoutWindow] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [signalStrength, setSignalStrength] = useState<number | null>(null);
  const [consistency, setConsistency] = useState<number | null>(null);
  const [currentTrendId, setCurrentTrendId] = useState<string | null>(null);

  // TODO: replace with real data source
  interface TrendReasoning {
    social: string[];
    creator: string[];
    search: string[];
    tooling: string[];
  }

  const [trendReasoning, setTrendReasoning] = useState<TrendReasoning | null>(null);

  // TODO: replace with real data source
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
      const premium = sessionStorage.getItem("isPremiumDev") === "true";
      setIsPremiumDev(premium);
      const stored = sessionStorage.getItem("watchlist");
      if (stored) {
        setWatchlist(new Set(JSON.parse(stored)));
      }
    }
  }, []);

  // TODO: wire to backend later
  const saveToWatchlist = (trendId: string, trendName: string, category: string) => {
    if (watchlist.has(trendId)) return;
    if (!isPremiumDev && watchlist.size >= 1) return;
    const newWatchlist = new Set(watchlist);
    newWatchlist.add(trendId);
    setWatchlist(newWatchlist);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("watchlist", JSON.stringify(Array.from(newWatchlist)));
      // TODO: replace with real data source
      const existing = JSON.parse(sessionStorage.getItem("watchlistData") || "[]");
      existing.push({
        id: trendId,
        name: trendName,
        category,
        status: "Still emerging",
        savedAt: Date.now(),
        peakHoursAfterSave: isPremiumDev ? Math.floor(Math.random() * 12) + 1 : undefined,
      });
      sessionStorage.setItem("watchlistData", JSON.stringify(existing));
    }
  };

  // TODO: wire to backend later
  const removeFromWatchlist = (trendId: string) => {
    if (!watchlist.has(trendId)) return;
    const newWatchlist = new Set(watchlist);
    newWatchlist.delete(trendId);
    setWatchlist(newWatchlist);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("watchlist", JSON.stringify(Array.from(newWatchlist)));
      // TODO: replace with real data source
      const existing = JSON.parse(sessionStorage.getItem("watchlistData") || "[]");
      const filtered = existing.filter((item: { id: string }) => item.id !== trendId);
      sessionStorage.setItem("watchlistData", JSON.stringify(filtered));
    }
  };

  const toggleWatchlist = (trendId: string, trendName: string, category: string) => {
    if (watchlist.has(trendId)) {
      removeFromWatchlist(trendId);
    } else {
      saveToWatchlist(trendId, trendName, category);
    }
  };

  // TODO: replace with real data source
  const insights = [
    "Early creators benefit from lower competition.",
    "Validate demand before heavy investment.",
    "Opportunity window closing as interest grows.",
    "Early adopters have content advantage.",
    "Research recommended before launch.",
  ];

  // TODO: replace with real data source
  const shareableTemplates = [
    "Early signals suggest {topic} entering rapid growth.",
    "Trend analysis shows {topic} gaining momentum.",
    "Data shows {topic} gaining traction.",
    "Emerging patterns suggest {topic} approaching tipping point.",
    "Recent signals point to growing interest in {topic}.",
  ];

  useEffect(() => {
    if (text) {
      setLoading(true);
      const timer = setTimeout(() => {
        const strengths: ("Very Very Low" | "Very Low" | "Low" | "Moderate" | "High" | "Very High" | "Exploding")[] = ["Very Very Low", "Very Low", "Low", "Moderate", "High", "Very High", "Exploding"];
        const statuses: ("Rising" | "Peaking" | "Declining")[] = ["Rising", "Peaking", "Declining"];
        const accelerations: ("Slow" | "Rising" | "Exploding")[] = ["Slow", "Rising", "Exploding"];
        const selectedStrength = strengths[Math.floor(Math.random() * 7)];
        const selectedStatus = statuses[Math.floor(Math.random() * 3)];
        const selectedAcceleration = accelerations[Math.floor(Math.random() * 3)];
        const template = shareableTemplates[Math.floor(Math.random() * shareableTemplates.length)];
        const hoursAgo = isPremiumDev 
          ? Math.floor(Math.random() * (4 - 1 + 1)) + 1
          : Math.floor(Math.random() * (24 - 12 + 1)) + 12;
        const windows = ["2–5 days", "3–7 days", "5–10 days", "1–2 weeks"];
        const trendId = `trend-${text.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
        setCurrentTrendId(trendId);
        setTrendStrength(selectedStrength);
        const baseConfidence = Math.floor(Math.random() * (90 - 55 + 1)) + 55;
        setConfidenceScore(baseConfidence);
        setSignalStrength(Math.floor(Math.random() * (95 - 60 + 1)) + 60);
        setConsistency(Math.floor(Math.random() * (92 - 58 + 1)) + 58);
        setTrendStatus(selectedStatus);
        setAccelerationRating(selectedAcceleration);
        setBreakoutWindow(windows[Math.floor(Math.random() * windows.length)]);
        setInsight(insights[Math.floor(Math.random() * insights.length)]);
          // TODO: replace with real data source
        setTrendReasoning({
          social: [
            `Mentions increased ${Math.floor(Math.random() * 40) + 20}% across platforms`,
            `Viral potential detected in ${Math.floor(Math.random() * 5) + 2} key communities`,
          ],
          creator: [
            `Early adopters saw ${Math.floor(Math.random() * 30) + 15}% engagement lift`,
            `${Math.floor(Math.random() * 20) + 10} top creators started using this`,
          ],
          search: [
            `Search volume up ${Math.floor(Math.random() * 50) + 25}% month-over-month`,
            `Long-tail queries emerging in ${Math.floor(Math.random() * 8) + 3} languages`,
          ],
          tooling: [
            `New tools launched: ${Math.floor(Math.random() * 5) + 2} in last 30 days`,
            `Developer interest increased ${Math.floor(Math.random() * 35) + 18}%`,
          ],
        });
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
      setAccelerationRating(null);
      setBreakoutWindow(null);
      setInsight(null);
      setShareableInsight(null);
      setDetectedHoursAgo(null);
      setSignalStrength(null);
      setConsistency(null);
      setTrendReasoning(null);
      setCurrentTrendId(null);
      setCopied(false);
    }
  }, [text, isPremiumDev]);

  const getTrendStrengthEmoji = (strength: typeof trendStrength) => {
    if (!strength) return "";
    const emojis: Record<typeof strength, string> = {
      "Very Very Low": "🔻🔻🔻",
      "Very Low": "🔻🔻",
      "Low": "🔻",
      "Moderate": "🟡",
      "High": "🟢",
      "Very High": "🟢🟢",
      "Exploding": "🚀🟢🟢",
    };
    return emojis[strength];
  };

  const getNotificationTime = (hoursAgo: number) => {
    const now = new Date();
    const notificationTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    return notificationTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black sm:px-16">
        <div className="flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
                  Trend Project
                </h1>
                <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  A universal trend-prediction engine for the internet
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    DEV: Premium
                  </label>
                  <input
                    type="checkbox"
                    checked={isPremiumDev}
                    onChange={(e) => setIsPremiumDev(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
                <a
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Dashboard
                </a>
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
                <a
                  href="/watchlist"
                  className="px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Watchlist
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-start">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                  Emerging Trends
                </h2>
                <p className="text-xs font-normal text-zinc-500 dark:text-zinc-500">
                  Trends detected before they go mainstream
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {emergingTrends.map((trend, index) => {
                  const hoursAgo = isPremiumDev 
                    ? (index % 4) + 1
                    : (index % 13) + 12;
                  const notificationTime = getNotificationTime(hoursAgo);
                  const trendId = `emerging-${trend.name.toLowerCase().replace(/\s+/g, "-")}`;
                  const isWatching = watchlist.has(trendId);
                  const canSave = isPremiumDev || watchlist.size < 1;
                  return (
                    <div key={index} className="flex flex-col gap-3 p-6 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-200 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-base font-semibold text-black dark:text-zinc-50">
                            {trend.name}
                          </span>
                          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-500">
                            {trend.category}
                          </span>
                        </div>
                        <button
                          onClick={() => isWatching ? removeFromWatchlist(trendId) : (canSave && saveToWatchlist(trendId, trend.name, trend.category))}
                          disabled={!isWatching && !canSave}
                          title={isWatching ? "Remove from watchlist" : ""}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                            isWatching
                              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                              : canSave
                              ? "bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                              : "bg-zinc-50 dark:bg-zinc-950 text-zinc-400/60 dark:text-zinc-600/60 border-zinc-200 dark:border-zinc-800 cursor-not-allowed"
                          }`}
                        >
                          {isWatching ? "Watching 👁️" : "Add to Watchlist"}
                        </button>
                      </div>
                      {!canSave && !isWatching && (
                        <p className="text-xs font-normal text-zinc-500/80 dark:text-zinc-500/80">
                          Upgrade to save more trends
                        </p>
                      )}
                      <div className="flex flex-col gap-1.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-500">
                            Detected {hoursAgo} {hoursAgo === 1 ? "hour" : "hours"} ago 🔒
                          </span>
                        </div>
                        {!isPremiumDev ? (
                          <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                            Detected early by premium users
                          </p>
                        ) : (
                          <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">
                            Detected at {notificationTime}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                  🔍 Search Topics
                </label>
                <p className="text-xs font-normal text-zinc-500 dark:text-zinc-500">
                  Try searching a product, idea, or niche
                </p>
              </div>
              <input
                className="w-full px-4 py-3.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900/50 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 focus:border-zinc-400 dark:focus:border-zinc-600 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all duration-200"
                placeholder="Enter a topic (e.g. AI, fitness, crypto)"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              {!text && (
                <div className="flex flex-col items-center justify-center py-12 text-center mt-6">
                  <p className="text-sm font-normal text-zinc-500 dark:text-zinc-500">
                    Search a topic to see how it's trending
                  </p>
                </div>
              )}

              {text && (
                <>
                  {loading ? (
                    <div className="flex flex-col gap-3 w-full mt-6 p-8 bg-zinc-50/80 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
                      <p className="text-base font-normal text-zinc-600 dark:text-zinc-400">
                        Analyzing trends...👀
                      </p>
                    </div>
                  ) : (
                    <>
                      {trendStrength && trendStatus && (
                        <div className="flex flex-col gap-6 w-full mt-6">
                          <div className="flex flex-col gap-5 p-8 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-200 hover:shadow-sm">
                            <div className="flex items-center justify-between">
                              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                                Trend Summary
                              </h2>
                              {currentTrendId && (
                                <button
                                  onClick={() => watchlist.has(currentTrendId) ? removeFromWatchlist(currentTrendId) : saveToWatchlist(currentTrendId, text, "Search")}
                                  disabled={!watchlist.has(currentTrendId) && (!isPremiumDev && watchlist.size >= 1)}
                                  title={watchlist.has(currentTrendId) ? "Remove from watchlist" : ""}
                                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                                    watchlist.has(currentTrendId)
                                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                                      : (isPremiumDev || watchlist.size < 1)
                                      ? "bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                      : "bg-zinc-50 dark:bg-zinc-950 text-zinc-400/60 dark:text-zinc-600/60 border-zinc-200 dark:border-zinc-800 cursor-not-allowed"
                                  }`}
                                >
                                  {watchlist.has(currentTrendId) ? "Watching 👁️" : "Add to Watchlist"}
                                </button>
                              )}
                            </div>
                            {currentTrendId && !watchlist.has(currentTrendId) && !isPremiumDev && watchlist.size >= 1 && (
                              <p className="text-xs font-normal text-zinc-500/80 dark:text-zinc-500/80">
                                Upgrade to save more trends
                              </p>
                            )}
                            <div className="flex flex-col gap-5">
                              <div className="flex items-center gap-2.5">
                                <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Topic:</span>
                                <span className="text-base font-semibold text-black dark:text-zinc-50">{text}</span>
                              </div>
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Trend Strength:</span>
                                {isPremiumDev ? (
                                  <>
                                    <span className="text-sm font-semibold text-black dark:text-zinc-50">{trendStrength}</span>
                                    <span className="text-sm">{getTrendStrengthEmoji(trendStrength)}</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-sm font-semibold text-black dark:text-zinc-50 blur-sm">{trendStrength}</span>
                                    <span className="text-sm blur-sm">{getTrendStrengthEmoji(trendStrength)}</span>
                                  </>
                                )}
                                {(trendStrength === "Exploding" || trendStrength === "Very High") && isPremiumDev && (
                                  <span className="text-xs px-2.5 py-1 bg-orange-50/80 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 rounded-lg border border-orange-200/60 dark:border-orange-800/60 font-medium">
                                    🔥 Spiking
                                  </span>
                                )}
                                {(trendStrength === "Very Very Low" || trendStrength === "Very Low") && isPremiumDev && (
                                  <span className="text-xs px-2.5 py-1 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 rounded-lg border border-blue-200/60 dark:border-blue-800/60 font-medium">
                                    📉 Cooling
                                  </span>
                                )}
                              </div>
                              {confidenceScore !== null && (
                                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                  <h4 className="text-base font-semibold text-black dark:text-zinc-50">Confidence Breakdown</h4>
                                  <div className="flex flex-col gap-2.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400">Signal Strength:</span>
                                      {isPremiumDev ? (
                                        <span className="text-xs font-semibold text-black dark:text-zinc-50">{signalStrength}%</span>
                                      ) : (
                                        <span className="text-xs font-semibold text-black/50 dark:text-zinc-50/50 blur-sm">{signalStrength}%</span>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400">Consistency:</span>
                                      {isPremiumDev ? (
                                        <span className="text-xs font-semibold text-black dark:text-zinc-50">{consistency}%</span>
                                      ) : (
                                        <span className="text-xs font-semibold text-black/50 dark:text-zinc-50/50 blur-sm">{consistency}%</span>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400">Acceleration:</span>
                                      {isPremiumDev ? (
                                        <span className="text-xs font-semibold text-black dark:text-zinc-50">{confidenceScore}%</span>
                                      ) : (
                                        <span className="text-xs font-semibold text-black/50 dark:text-zinc-50/50 blur-sm">{confidenceScore}%</span>
                                      )}
                                    </div>
                                  </div>
                                  {!isPremiumDev && (
                                    <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70 pt-1">
                                      Unlock full insight with Pro
                                    </p>
                                  )}
                                </div>
                              )}
                              {accelerationRating && (
                                <div className="flex items-center gap-2.5">
                                  <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Acceleration:</span>
                                  {isPremiumDev ? (
                                    <span className="text-sm font-semibold text-black dark:text-zinc-50">{accelerationRating}</span>
                                  ) : (
                                    <span className="text-sm font-semibold text-black/50 dark:text-zinc-50/50 blur-sm">{accelerationRating}</span>
                                  )}
                                </div>
                              )}
                              {breakoutWindow && (
                                <div className="flex items-center gap-2.5">
                                  <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Breakout Window:</span>
                                  {isPremiumDev ? (
                                    <span className="text-sm font-semibold text-black dark:text-zinc-50">{breakoutWindow}</span>
                                  ) : (
                                    <span className="text-sm font-semibold text-black/50 dark:text-zinc-50/50 blur-sm">{breakoutWindow}</span>
                                  )}
                                </div>
                              )}
                              <div className="flex items-center gap-2.5">
                                <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Trend Status:</span>
                                <span className="text-sm font-semibold text-black dark:text-zinc-50">{trendStatus}</span>
                              </div>
                              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                <p className="text-sm font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
                                  {trendStatus === "Rising" && "Accelerating interest across platforms."}
                                  {trendStatus === "Peaking" && "Interest high, nearing saturation."}
                                  {trendStatus === "Declining" && "Interest cooling."}
                                </p>
                              </div>
                              {detectedHoursAgo !== null && (
                                <div className="flex flex-col gap-1.5 pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs font-normal text-zinc-500 dark:text-zinc-500">
                                      Detected {detectedHoursAgo} {detectedHoursAgo === 1 ? "hour" : "hours"} ago 🔒
                                    </p>
                                  </div>
                                  {!isPremiumDev ? (
                                    <>
                                      <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                                        Detected {detectedHoursAgo}h late
                                      </p>
                                      <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                                        Unlock full insight with Pro
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">
                                      Detected at {getNotificationTime(detectedHoursAgo)}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-4 pt-5 border-t border-zinc-200/60 dark:border-zinc-700/60">
                              <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                                Trend Growth
                              </h3>
                              <div className="relative h-40 bg-zinc-50/80 dark:bg-zinc-950/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 p-4">
                                <div className={isPremiumDev ? "" : "blur-sm opacity-70"}>
                                  <svg className="w-full h-full" viewBox="0 0 240 120" preserveAspectRatio="none">
                                    <line x1="30" y1="100" x2="200" y2="30" stroke="#ef4444" strokeWidth="2.5" />
                                    <line x1="200" y1="30" x2="230" y2="15" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="5 5" />
                                    <line x1="70" y1="0" x2="70" y2="120" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 3" />
                                    <text x="72" y="115" fontSize="9" fill="#22c55e" fontWeight="600">Trend Project Entry Point</text>
                                    <circle cx="70" cy="75" r="4" fill="#22c55e" />
                                  </svg>
                                </div>
                                {isPremiumDev ? (
                                  <div className="absolute bottom-3 left-4 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                                    Entry point
                                  </div>
                                ) : (
                                  <div className="absolute bottom-3 left-4 text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                                    🔒 Unlock full growth projection
                                  </div>
                                )}
                              </div>
                              {!isPremiumDev && (
                                <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                                  Unlock full insight with Pro
                                </p>
                              )}
                            </div>

                            <div className="flex flex-col gap-2 pt-5 border-t border-zinc-200/60 dark:border-zinc-700/60">
                              {isPremiumDev ? (
                                <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">
                                  Next update in 2m 14s
                                </p>
                              ) : (
                                <div className="flex flex-col gap-1.5">
                                  <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">
                                    Next update in 23h 12m
                                  </p>
                                  <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                                    Upgrade to refresh now
                                  </p>
                                </div>
                              )}
                            </div>

                            {isPremiumDev && (
                              <div className="flex flex-col gap-2.5 pt-5 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                                  History
                                </h3>
                                <div className="flex flex-col gap-1.5">
                                  <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">✅ You caught this early</p>
                                  <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400">🚀 This trend went mainstream</p>
                                </div>
                              </div>
                            )}
                            {!isPremiumDev && (
                              <div className="flex flex-col gap-2.5 pt-5 border-t border-zinc-200/60 dark:border-zinc-700/60">
                                <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                                  History
                                </h3>
                                <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">❌ This trend peaked before you saw it</p>
                              </div>
                            )}
                          </div>

                          {trendReasoning && (
                            <div className="flex flex-col gap-4 p-7 bg-zinc-50/80 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-200 hover:shadow-sm">
                              <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                                Why this is emerging
                              </h3>
                              {isPremiumDev ? (
                                <div className="flex flex-col gap-4">
                                  <div>
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Social signals</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.social.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Creator adoption</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.creator.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Search behaviour</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.search.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Tooling ecosystem</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.tooling.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-3">
                                  <div>
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Social signals</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      <li>• {trendReasoning.social[0]}</li>
                                      {trendReasoning.social.slice(1).map((signal, i) => (
                                        <li key={i} className="blur-sm opacity-50">• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="blur-sm opacity-50">
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Creator adoption</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.creator.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="blur-sm opacity-50">
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Search behaviour</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.search.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="blur-sm opacity-50">
                                    <h4 className="text-xs font-semibold text-black dark:text-zinc-50 mb-2">Tooling ecosystem</h4>
                                    <ul className="text-xs font-normal leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-1.5">
                                      {trendReasoning.tooling.map((signal, i) => (
                                        <li key={i}>• {signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70 pt-2">
                                    Unlock full reasoning with Pro
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                          {!isPremiumDev && !trendReasoning && (
                            <div className="flex flex-col gap-2 p-5 bg-zinc-50/80 dark:bg-zinc-900/30 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
                              <p className="text-xs font-normal text-zinc-500/70 dark:text-zinc-500/70">
                                Unlock full insight with Pro
                              </p>
                            </div>
                          )}

                          {isPremiumDev && shareableInsight && (
                            <div className="flex flex-col gap-4 p-7 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-200 hover:shadow-sm">
                              <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                                Shareable Insight
                              </h3>
                              <p className="text-sm font-normal leading-relaxed text-zinc-600 dark:text-zinc-400">
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
                                className="self-start px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-all duration-150"
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
          </div>
        </div>
      </main>
    </div>
  );
}
