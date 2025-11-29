import React from "react";

const ModesSection = () => {
  return (
    <section id="modes" className="py-12 border-t border-slate-800/60">
      <div className="flex flex-col gap-8 md:flex-row md:items-stretch">
        <div className="md:w-1/3">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Two modes. One goal: a stress-free retirement.
          </h2>
          <p className="text-slate-300 text-sm">
            Start simple with Basic mode, or switch to Advanced when you&apos;re
            ready to share full professional and financial details.
          </p>
        </div>

        <div className="md:w-2/3 grid sm:grid-cols-2 gap-5">
          {/* Basic Mode */}
          <div className="card-glass p-4 space-y-2">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                B
              </span>
              Basic Mode
            </h3>
            <p className="text-xs text-slate-300">
              Asks only a few inputs:
            </p>
            <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
              <li>Current age & planned retirement age</li>
              <li>Approx monthly income & savings</li>
              <li>Desired monthly income in retirement (today&apos;s value)</li>
            </ul>
            <p className="text-xs text-slate-400 pt-1">
              Output: a rough estimate of retirement corpus and monthly saving
              needed – perfect for quick checks.
            </p>
          </div>

          {/* Advanced Mode */}
          <div className="card-glass p-4 space-y-2 border border-emerald-500/40">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-emerald-500/80 flex items-center justify-center text-[10px]">
                A
              </span>
              Advanced Mode
            </h3>
            <p className="text-xs text-slate-300">
              The agent takes a full financial snapshot:
            </p>
            <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
              <li>Age, profession, career path & work location</li>
              <li>Income, savings, expenses & living costs</li>
              <li>Existing investments (FDs, SIPs, EPF, NPS, etc.)</li>
              <li>Dependants & education costs for children</li>
              <li>Target retirement age & lifestyle level</li>
            </ul>
            <p className="text-xs text-slate-400 pt-1">
              Output: estimated corpus, required savings, budget split, and
              recommended{" "}
              <span className="font-semibold">
                investment style (aggressive vs safe) with Indian product
                examples.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModesSection;
