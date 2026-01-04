"use client";
import { useState, useEffect } from "react";

// TODO: replace with real data source
type TrendStatus = "Still emerging" | "Went mainstream";

interface WatchlistTrend {
  id: string;
  name: string;
  category: string;
  status: TrendStatus;
  savedAt: number;
  peakHoursAfterSave?: number;
}

export default function Watchlist() {
  const [isPremiumDev, setIsPremiumDev] = useState(false);
  const [watchlist, setWatchlist] = useState<WatchlistTrend[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // TODO: replace with real data source
      const stored = sessionStorage.getItem("watchlistData");
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
      const premium = sessionStorage.getItem("isPremiumDev") === "true";
      setIsPremiumDev(premium);
    }
  }, []);

  // TODO: replace with real data source
  const getTimeFeedback = (trend: WatchlistTrend) => {
    if (isPremiumDev && trend.peakHoursAfterSave) {
      return `✅ Saved ${trend.peakHoursAfterSave} hours before peak`;
    }
    return "❌ Trend peaked before detection";
  };

  // TODO: wire to backend later
  const removeFromWatchlist = (trendId: string) => {
    const newWatchlist = watchlist.filter(item => item.id !== trendId);
    setWatchlist(newWatchlist);
    if (typeof window !== "undefined") {
      // TODO: replace with real data source
      sessionStorage.setItem("watchlistData", JSON.stringify(newWatchlist));
      const storedIds = JSON.parse(sessionStorage.getItem("watchlist") || "[]");
      const filteredIds = storedIds.filter((id: string) => id !== trendId);
      sessionStorage.setItem("watchlist", JSON.stringify(filteredIds));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black sm:px-16">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                  Watchlist
                </h1>
                <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  Personal intelligence feed
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
                    onChange={(e) => {
                      setIsPremiumDev(e.target.checked);
                      sessionStorage.setItem("isPremiumDev", String(e.target.checked));
                    }}
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
                  href="/pricing"
                  className="px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  Pricing
                </a>
              </div>
            </div>
          </div>

          {!isPremiumDev && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Free users can save 1 trend
              </p>
            </div>
          )}

          {watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-normal text-zinc-500 dark:text-zinc-500">
                Saved trends will appear here
              </p>
              <a
                href="/"
                className="mt-4 px-4 py-2 text-sm font-medium text-black dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg border border-zinc-300 dark:border-zinc-700 transition-colors"
              >
                Browse Trends
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {watchlist.map((trend) => (
                <div
                  key={trend.id}
                  className="flex flex-col gap-3 p-5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                        {trend.name}
                      </h3>
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">
                        {trend.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        trend.status === "Went mainstream"
                          ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                          : "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      }`}>
                        {trend.status}
                      </span>
                      <button
                        onClick={() => removeFromWatchlist(trend.id)}
                        title="Remove from watchlist"
                        className="text-xs px-3 py-1.5 rounded-lg border bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Watching 👁️
                      </button>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {getTimeFeedback(trend)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

