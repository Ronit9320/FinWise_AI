import React, { useState } from "react";
import { computeRetirementPlan } from "../utils/retirementCalculator";

// Helper for formatting rupees nicely
const formatINR = (amount) => {
  if (!isFinite(amount)) return "-";
  return amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
};

const formatCrores = (amount) => {
  if (!isFinite(amount)) return "-";
  const crores = amount / 1e7; // 1 crore = 1,00,00,000
  return `${crores.toFixed(1)} Cr`;
};

const CalculatorSection = () => {
  const [form, setForm] = useState({
    currentAge: 25,
    retirementAge: 60,
    lifeExpectancy: 85,
    monthlyExpenseToday: 60000,
    inflationRate: 6, // %
    preRetReturn: 10, // %
    postRetReturn: 6, // %
    existingCorpus: 300000,
    monthlyInvestment: 20000,
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    // Allow empty input (0 as fallback)
    setForm((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Number(value),
    }));
  };

  // Convert % into decimals for calculations
  const plan = computeRetirementPlan({
    currentAge: Number(form.currentAge) || 0,
    retirementAge: Number(form.retirementAge) || 0,
    lifeExpectancy: Number(form.lifeExpectancy) || 0,
    monthlyExpenseToday: Number(form.monthlyExpenseToday) || 0,
    inflationRate: (Number(form.inflationRate) || 0) / 100,
    preRetReturn: (Number(form.preRetReturn) || 0) / 100,
    postRetReturn: (Number(form.postRetReturn) || 0) / 100,
    existingCorpus: Number(form.existingCorpus) || 0,
    monthlyInvestment: Number(form.monthlyInvestment) || 0,
  });

  const {
    yearsToRetire,
    yearsInRetirement,
    monthlyAtRetirement,
    requiredCorpus,
    estimatedCorpus,
    corpusGap,
    requiredMonthlyInvestment,
  } = plan;

  const isShortfall = corpusGap > 0;

  return (
    <section id="calculator" className="py-12 border-t border-slate-800/60">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        Retirement calculator
      </h2>
      <p className="text-slate-300 text-sm mb-6 max-w-2xl">
        Enter your age, retirement goals and expenses to estimate the retirement
        corpus you&apos;ll need and the monthly investment required to reach it.
        This follows the same idea as Angel One&apos;s retirement calculator:
        adjusting your expenses for inflation and compounding your savings.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left – Inputs */}
        <div className="card-glass p-5 space-y-4">
          <h3 className="text-sm font-semibold mb-1">Your retirement inputs</h3>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {/* Current Age */}
            <div>
              <label className="block text-slate-400 mb-1">
                Current age (years)
              </label>
              <input
                type="number"
                min="18"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.currentAge}
                onChange={handleChange("currentAge")}
              />
            </div>

            {/* Retirement Age */}
            <div>
              <label className="block text-slate-400 mb-1">
                Retirement age (years)
              </label>
              <input
                type="number"
                min="30"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.retirementAge}
                onChange={handleChange("retirementAge")}
              />
            </div>

            {/* Life Expectancy */}
            <div>
              <label className="block text-slate-400 mb-1">
                Life expectancy (years)
              </label>
              <input
                type="number"
                min="60"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.lifeExpectancy}
                onChange={handleChange("lifeExpectancy")}
              />
            </div>

            {/* Monthly Expense Today */}
            <div>
              <label className="block text-slate-400 mb-1">
                Monthly expenses today (₹)
              </label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.monthlyExpenseToday}
                onChange={handleChange("monthlyExpenseToday")}
              />
            </div>

            {/* Inflation Rate */}
            <div>
              <label className="block text-slate-400 mb-1">
                Expected inflation rate (% p.a.)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.inflationRate}
                onChange={handleChange("inflationRate")}
              />
            </div>

            {/* Pre-retirement return */}
            <div>
              <label className="block text-slate-400 mb-1">
                Pre-retirement return (% p.a.)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.preRetReturn}
                onChange={handleChange("preRetReturn")}
              />
            </div>

            {/* Post-retirement return */}
            <div>
              <label className="block text-slate-400 mb-1">
                Post-retirement return (% p.a.)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.postRetReturn}
                onChange={handleChange("postRetReturn")}
              />
            </div>

            {/* Existing Savings */}
            <div>
              <label className="block text-slate-400 mb-1">
                Existing retirement savings (₹)
              </label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.existingCorpus}
                onChange={handleChange("existingCorpus")}
              />
            </div>

            {/* Current Monthly Investment */}
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">
                Current monthly investment towards retirement (₹)
              </label>
              <input
                type="number"
                min="0"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.monthlyInvestment}
                onChange={handleChange("monthlyInvestment")}
              />
              <p className="text-[10px] text-slate-500 mt-1">
                This helps estimate your corpus from your existing plan. The
                calculator will also tell you how much you{" "}
                <span className="font-semibold">should</span> invest monthly to
                reach your goal.
              </p>
            </div>
          </div>
        </div>

        {/* Right – Results */}
        <div className="space-y-4">
          {/* High-level summary */}
          <div className="card-glass p-4 text-xs space-y-2">
            <h3 className="text-sm font-semibold mb-1">Retirement summary</h3>
            <p className="text-slate-300">
              Years to retirement:{" "}
              <span className="font-semibold">{yearsToRetire} years</span>
            </p>
            <p className="text-slate-300">
              Years in retirement (life expectancy – retirement age):{" "}
              <span className="font-semibold">{yearsInRetirement} years</span>
            </p>
            <p className="text-slate-300">
              Monthly expenses at retirement (inflation-adjusted):{" "}
              <span className="font-semibold text-emerald-400">
                ₹{formatINR(Math.round(monthlyAtRetirement || 0))}
              </span>
            </p>
          </div>

          {/* Corpus numbers */}
          <div className="card-glass p-4 text-xs space-y-3">
            <h3 className="text-sm font-semibold mb-1">
              Corpus and investments
            </h3>

            <div className="flex justify-between text-slate-300">
              <span>Retirement corpus required</span>
              <span className="font-semibold text-emerald-400 text-right">
                ₹{formatINR(Math.round(requiredCorpus || 0))} <br />
                <span className="text-[10px] text-slate-500">
                  ({formatCrores(requiredCorpus || 0)})
                </span>
              </span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Corpus from your current plan</span>
              <span className="font-semibold text-primary text-right">
                ₹{formatINR(Math.round(estimatedCorpus || 0))} <br />
                <span className="text-[10px] text-slate-500">
                  ({formatCrores(estimatedCorpus || 0)})
                </span>
              </span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Gap / surplus at retirement</span>
              <span
                className={`font-semibold text-right ${isShortfall ? "text-rose-400" : "text-emerald-400"
                  }`}
              >
                {isShortfall ? "Shortfall" : "Surplus"}: ₹
                {formatINR(Math.abs(Math.round(corpusGap || 0)))}
                <br />
                <span className="text-[10px] text-slate-500">
                  ({formatCrores(Math.abs(corpusGap || 0))})
                </span>
              </span>
            </div>
          </div>

          {/* Required SIP like Angel One output */}
          <div className="card-glass p-4 text-xs space-y-2">
            <h3 className="text-sm font-semibold mb-1">
              Monthly investment needed
            </h3>
            <p className="text-slate-300">
              To build the required corpus by age{" "}
              <span className="font-semibold">{form.retirementAge || "-"}</span>
              , you should invest approximately:
            </p>

            <p className="text-lg font-semibold text-emerald-400">
              ₹{formatINR(Math.round(requiredMonthlyInvestment || 0))}{" "}
              <span className="text-xs text-slate-300 font-normal">
                per month
              </span>
            </p>

            <p className="text-[10px] text-slate-500">
              This uses the same logic as Angel One&apos;s retirement
              calculator: your monthly expenses are grown by inflation until
              retirement, and then we compute the lump sum needed to fund those
              expenses for your retired years, given the expected
              post-retirement return. Then we work backwards to find the SIP
              needed from today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
