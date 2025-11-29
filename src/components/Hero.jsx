import React from "react";

const Hero = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div className="space-y-6">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Agentic AI for{" "}
            <span className="text-primary">Indian Retirement Planning</span>.
          </motion.h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl">
            RetireWise AI acts as your personal retirement analyst and reminder
            assistant. Chat in{" "}
            <span className="font-medium text-slate-100">Basic</span> or{" "}
            <span className="font-medium text-slate-100">Advanced</span> mode
            and get clear savings targets, budgets, and investment styles –
            tuned for Indian incomes, expenses, and inflation.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.botpressWebChat && window.botpressWebChat.sendEvent({ type: "show" })}
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-indigo-500 text-sm font-semibold"
            >
              Start Basic Mode
            </button>
            <button
              onClick={() => window.botpressWebChat && window.botpressWebChat.sendEvent({ type: "show" })}
              className="px-5 py-2.5 rounded-full border border-slate-700 text-sm font-semibold hover:border-slate-500"
            >
              Try Advanced Planner
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>🇮🇳 Built for Indian tax & cost of living</span>
            <span>📅 Automated 1st-of-month reminders</span>
            <span>🧮 Goal-based retirement math</span>
          </div>
        </div>

        {/* Right – mock chat / stats */}
        <motion.div
          className="card-glass p-5 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span>RetireWise – Live session</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online
            </span>
          </div>

          <div className="rounded-xl bg-slate-950/40 p-3 space-y-2 text-xs">
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/70 flex items-center justify-center text-[10px]">
                AI
              </div>
              <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                Hi Atharva 👋 Let&apos;s plan your retirement. Do you want{" "}
                <strong>Basic</strong> or <strong>Advanced</strong> mode?
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="bg-primary/90 text-slate-50 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                Advanced. I want to retire at 55 with today&apos;s ₹1.5L per
                month lifestyle.
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/70 flex items-center justify-center text-[10px]">
                AI
              </div>
              <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                Got it. You&apos;ll need an estimated{" "}
                <span className="font-semibold text-emerald-400">
                  ₹3.2 Cr
                </span>{" "}
                in retirement savings. You&apos;re currently on track for{" "}
                <span className="text-yellow-300 font-semibold">₹2.4 Cr</span>.
                Let&apos;s optimize your monthly budget and investments.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/60 rounded-xl p-3">
              <div className="text-slate-400 mb-1">Est. Corpus</div>
              <div className="text-lg font-semibold text-emerald-400">
                ₹3.2 Cr
              </div>
              <div className="text-[10px] text-slate-500">At age 55</div>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3">
              <div className="text-slate-400 mb-1">Monthly Save</div>
              <div className="text-lg font-semibold text-primary">
                ₹38k
              </div>
              <div className="text-[10px] text-slate-500">Recommended</div>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3">
              <div className="text-slate-400 mb-1">Risk Profile</div>
              <div className="text-xs font-semibold text-orange-300">
                Moderately Aggressive
              </div>
              <div className="text-[10px] text-slate-500">Equity + Debt</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
