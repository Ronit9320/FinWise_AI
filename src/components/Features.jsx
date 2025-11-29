import React from "react";

const FEATURES = [
  {
    title: "Corpus estimation",
    desc: "Calculates estimated retirement savings by compounding your current savings and planned contributions till retirement.",
  },
  {
    title: "Required savings",
    desc: "Computes the corpus you actually need based on target retirement lifestyle, Indian inflation, and life expectancy.",
  },
  {
    title: "Budget optimization",
    desc: "Generates a monthly budget split for needs, wants, and investments to hit your target corpus.",
  },
  {
    title: "Investment style",
    desc: "Suggests aggressive, balanced, or conservative strategy and typical Indian instruments for each.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-12 border-t border-slate-800/60">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        What the Advanced Agent actually does
      </h2>
      <p className="text-slate-300 text-sm mb-6 max-w-2xl">
        Inside the chat flow, the agent runs a set of calculations on your data
        and returns clear numbers + actions. Think of it as your CA + planner +
        reminder system.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="card-glass p-4">
            <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
            <p className="text-xs text-slate-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
