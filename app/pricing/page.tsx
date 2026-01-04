"use client";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-16">
        <div className="flex w-full flex-col gap-12">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
              Choose your plan
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Most users upgrade after missing 2 trends
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
        </div>
      </main>
    </div>
  );
}
