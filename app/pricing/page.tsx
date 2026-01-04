"use client";

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      description: "Basic trend preview",
      features: [
        "Basic trend preview",
        "Limited searches",
        "Delayed results",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Starter",
      description: "More searches and faster previews",
      features: [
        "More searches",
        "Faster previews",
        "Trend strength + confidence",
      ],
      buttonText: "Upgrade",
    },
    {
      name: "Pro",
      description: "Full analysis and priority updates",
      features: [
        "Unlimited searches",
        "Full trend analysis",
        "Priority updates",
      ],
      buttonText: "Upgrade",
      highlighted: true,
    },
    {
      name: "Premium",
      description: "Everything unlocked with early access",
      features: [
        "Everything unlocked",
        "Early trend alerts (fake)",
        "Access to future features",
      ],
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
                {tier.highlighted && (
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    Best Value
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                    {tier.name}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {tier.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-2">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

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

