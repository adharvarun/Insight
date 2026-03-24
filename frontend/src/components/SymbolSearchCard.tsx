import { useState } from "react";

type SymbolSearchCardProps = {
  onSearch: (symbol: string) => void;
  loading?: boolean;
};

export default function SymbolSearchCard({ onSearch, loading }: SymbolSearchCardProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!onSearch) return;
    onSearch(input.trim().toUpperCase());
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            htmlFor="symbol"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            Enter Symbol
          </label>
          <input
            id="symbol"
            placeholder="e.g. AAPL, MSFT, TSLA"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-base text-slate-100 outline-none ring-cyan-400 transition focus:border-cyan-400 focus:ring-2"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="h-12 rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {loading ? "Loading..." : "Analyze Symbol"}
        </button>
      </div>
    </section>
  );
}
