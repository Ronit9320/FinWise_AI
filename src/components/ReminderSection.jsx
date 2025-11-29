import React, { useState } from "react";
import axios from "axios";

const ReminderSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:4000/api/reminders/subscribe", form);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="reminders" className="py-12 border-t border-slate-800/60">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        Automated reminders on the 1st of every month
      </h2>
      <p className="text-slate-300 text-sm mb-6 max-w-2xl">
        Never forget to review your savings and investments. We email you a
        simple checklist on the 1st of every month – you can plug this into
        your Botpress flows too.
      </p>

      <div className="card-glass p-5 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1">
              Email for reminders
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 rounded-full bg-primary hover:bg-indigo-500 text-sm font-semibold"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Enable monthly reminders"}
          </button>

          {status === "success" && (
            <p className="text-emerald-400 text-xs mt-2">
              You&apos;re in! You&apos;ll receive a reminder on the 1st of every month.
            </p>
          )}
          {status === "error" && (
            <p className="text-rose-400 text-xs mt-2">
              Something went wrong. Check the backend or try again.
            </p>
          )}
        </form>

        <p className="text-[10px] text-slate-500 mt-3">
          Note: For production, plug in a real email service (e.g. SendGrid /
          SES) and host the backend. Browser cannot send emails on its own when
          your site is closed.
        </p>
      </div>
    </section>
  );
};

export default ReminderSection;
