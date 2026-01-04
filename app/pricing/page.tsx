"use client";

// TODO: replace with real data source
export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "£0",
      period: "/ month",
      headline: "See trends after momentum has already formed",
      description: "Delayed and limited access",
      buttonText: "Get Started",
    },
    {
      name: "Starter",
      price: "£9",
      period: "/ month",
      headline: "Be early, consistently",
      description: "Early visibility and faster refresh",
      buttonText: "Upgrade",
    },
    {
      name: "Pro",
      price: "£29",
      period: "/ month",
      headline: "Built for people who profit from being first",
      description: "Full confidence, acceleration, and reasoning",
      buttonText: "Upgrade",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Premium",
      price: "£79",
      period: "/ month",
      headline: "See trends before breakout",
      description: "Elite access for serious users",
      buttonText: "Upgrade",
    },
  ];

  const comparisonFeatures = [
    { feature: "Trend searches", free: "Limited", starter: "More", pro: "Unlimited", premium: "Unlimited" },
    { feature: "Update frequency", free: "Daily", starter: "Every 6h", pro: "Real-time", premium: "Real-time" },
    { feature: "Confidence scores", free: "Blurred", starter: "Visible", pro: "Full breakdown", premium: "Full breakdown" },
    { feature: "Growth charts", free: "Blurred", starter: "Visible", pro: "Full analysis", premium: "Full analysis" },
    { feature: "Watchlist", free: "1 trend", starter: "5 trends", pro: "Unlimited", premium: "Unlimited" },
    { feature: "Early access", free: "12–24h delay", starter: "6–12h delay", pro: "1–4h early", premium: "1–4h early" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-16">
        <div className="flex w-full flex-col gap-12">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
              Pricing
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Value comparison and upgrade clarity
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col gap-5 rounded-lg border p-6 ${
                  tier.highlighted
                    ? "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 ring-2 ring-zinc-500"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {tier.badge && (
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    {tier.badge}
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                      {tier.name}
                    </h2>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-black dark:text-zinc-50">
                        {tier.price}
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {tier.period}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-black dark:text-zinc-50">
                      {tier.headline}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <button
                  className={`mt-auto w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-black dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                      : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 text-center">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Feature</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Free</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Starter</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Pro</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-b border-zinc-100 dark:border-zinc-900">
                      <td className="py-3 px-4 text-sm text-zinc-700 dark:text-zinc-300">{item.feature}</td>
                      <td className="py-3 px-4 text-sm text-center text-zinc-600 dark:text-zinc-400">{item.free}</td>
                      <td className="py-3 px-4 text-sm text-center text-zinc-600 dark:text-zinc-400">{item.starter}</td>
                      <td className="py-3 px-4 text-sm text-center font-medium text-black dark:text-zinc-50">{item.pro}</td>
                      <td className="py-3 px-4 text-sm text-center text-zinc-600 dark:text-zinc-400">{item.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-2 pt-4 text-center">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Cancel anytime • No payment required today
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
