import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary/80 flex items-center justify-center text-xs font-bold">
            RW
          </div>
          <span className="font-semibold tracking-tight">RetireWise AI</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <a href="#modes" className="hover:text-slate-50">Modes</a>
          <a href="#features" className="hover:text-slate-50">Features</a>
          <a href="#calculator" className="hover:text-slate-50">Calculator</a>

        </div>
         <button
           onClick={() => {
             if (window.botpressWebChat) {
               window.botpressWebChat.sendEvent({ type: "toggle" });
             }
           }}
           className="px-4 py-2 rounded-full bg-primary hover:bg-indigo-500 text-sm font-medium"
         >
           Chat with AI
         </button>
      </nav>
    </header>
  );
};

export default Navbar;
