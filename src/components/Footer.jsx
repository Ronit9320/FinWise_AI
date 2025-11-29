import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/60 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} RetireWise AI. All rights reserved.</span>
        <span>Built for Indian users – not a SEBI-registered advisor.</span>
      </div>
    </footer>
  );
};

export default Footer;

