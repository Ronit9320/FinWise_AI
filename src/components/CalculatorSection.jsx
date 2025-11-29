import React, { useState } from "react";
import {
  calculateRequiredCorpus,
  estimateFutureCorpus,
  suggestRiskProfile,
  buildBudget,
} from "../utils/retirementCalculator";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#F97316"];

const CalculatorSection = () => {
  const [form, setForm] = useState({
    age: 25,
    retireAge: 60,
    monthlyIncome: 80000,
    monthlySavings: 20000,
    currentCorpus: 300000,
    targetMonthlyToday: 60000,
    riskComfort: "medium",
  });

  const yearsToRetire = Math.max(form.retireAge - form.age, 1);

  const required = calculateRequiredCorpus({
    targetMonthlyToday: form.targetMonthlyToday,
    yearsToRetire,
  });

  const estimatedCorpus = estimateFutureCorpus({
    currentCorpus: form.currentCorpus,
    monthlyInvestment: form.monthlySavings,
    yearsToRetire,
  });

  const riskProfile = suggestRiskProfile({
    age: form.age,
    yearsToRetire,
    riskComfort: form.riskComfort,
  });

  const budget = buildBudget({
    netIncome: form.monthlyIncome,
    targetSavingsRatio:
      estimatedCorpus < required.requiredCorpus ? 0.35 : 0.25,
  });

  const budgetData = [
    { name: "Investments", value: budget.invest },
    { name: "Needs", value: budget.needs },
    { name: "Wants", value: budget.wants },
  ];

  const gap = required.requiredCorpus - estimatedCorpus;

  return (
    <section id="calculator" className="py-12 border-t border-slate-800/60">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        Try the retirement engine right now
      </h2>
      <p className="text-slate-300 text-sm mb-6 max-w-2xl">
        The chatbot will use similar logic under the hood when you&apos;re in
        Advanced mode. Here&apos;s a transparent view of the numbers.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left – form */}
        <div className="card-glass p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Current age</label>
              <input
                type="number"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Planned retirement age</label>
              <input
                type="number"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.retireAge}
                onChange={(e) =>
                  setForm({ ...form, retireAge: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Monthly income (₹)</label>
              <input
                type="number"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.monthlyIncome}
                onChange={(e) =>
                  setForm({ ...form, monthlyIncome: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Current monthly savings (₹)
              </label>
              <input
                type="number"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.monthlySavings}
                onChange={(e) =>
                  setForm({ ...form, monthlySavings: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Existing retirement corpus (₹)
              </label>
              <input
                type="number"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.currentCorpus}
                onChange={(e) =>
                  setForm({ ...form, currentCorpus: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Desired monthly income in retirement (today&apos;s ₹)
              </label>
              <input
                type="number"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.targetMonthlyToday}
                onChange={(e) =>
                  setForm({
                    ...form,
                    targetMonthlyToday: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">
                Risk comfort level
              </label>
              <select
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.riskComfort}
                onChange={(e) =>
                  setForm({ ...form, riskComfort: e.target.value })
                }
              >
                <option value="low">Low (safety first)</option>
                <option value="medium">Medium (balanced)</option>
                <option value="high">High (growth focused)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right – results */}
        <div className="space-y-4">
          <div className="card-glass p-4 text-xs space-y-2">
            <h3 className="text-sm font-semibold mb-1">Retirement snapshot</h3>
            <p className="text-slate-300">
              You have <strong>{yearsToRetire}</strong> years to retire.
            </p>
            <p className="text-slate-300">
              Required retirement corpus:{" "}
              <span className="font-semibold text-emerald-400">
                ₹{Math.round(required.requiredCorpus / 1e5) / 10} Cr
              </span>
            </p>
            <p className="text-slate-300">
              Estimated corpus based on current plan:{" "}
              <span className="font-semibold text-primary">
                ₹{Math.round(estimatedCorpus / 1e5) / 10} Cr
              </span>
            </p>
            <p className="text-slate-300">
              Gap:{" "}
              <span
                className={`font-semibold ${
                  gap > 0 ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {gap > 0 ? `₹${Math.round(gap / 1e5) / 10} Cr short` : "On / above target"}
              </span>
            </p>
          </div>

          <div className="card-glass p-4 text-xs space-y-3">
            <h3 className="text-sm font-semibold">Suggested monthly budget</h3>
            <div className="flex justify-between text-slate-300">
              <span>Investments</span>
              <span className="font-semibold">₹{budget.invest.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Needs (rent, groceries, EMIs, etc.)</span>
              <span className="font-semibold">₹{budget.needs.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Wants (lifestyle, travel, etc.)</span>
              <span className="font-semibold">₹{budget.wants.toLocaleString("en-IN")}</span>
            </div>

            <div className="h-40 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={70}
                    labelLine={false}
                    label
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-glass p-4 text-xs space-y-2">
            <h3 className="text-sm font-semibold">Investment style</h3>
            <p className="text-slate-300">
              Recommended profile:{" "}
              <span className="font-semibold text-amber-300">
                {riskProfile.label}
              </span>
            </p>
            <p className="text-slate-300">
              Approx allocation – Equity:{" "}
              <strong>{Math.round(riskProfile.equity * 100)}%</strong>, Debt:{" "}
              <strong>{Math.round(riskProfile.debt * 100)}%</strong>, Others:{" "}
              <strong>{Math.round(riskProfile.others * 100)}%</strong>
            </p>
            <p className="text-slate-400">
              {riskProfile.description} You can map this to Indian options like
              equity mutual funds / index funds, debt funds, PPF, EPF, NPS,
              FDs, etc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
