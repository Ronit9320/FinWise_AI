import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ModesSection from "./components/ModesSection";
import Features from "./components/Features";
import CalculatorSection from "./components/CalculatorSection";
import ReminderSection from "./components/ReminderSection";
import Footer from "./components/Footer";
import BotpressChat from "./components/BotpressChat";

function App() {
  return (
    <div className="min-h-screen gradient-bg text-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <ModesSection />
        <Features />
        <CalculatorSection />
        <ReminderSection />
      </main>

      {/* Botpress widget lives globally */}
      <BotpressChat />

      <Footer />
    </div>
  );
}

export default App;
