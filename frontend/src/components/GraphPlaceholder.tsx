"use client";

import { useEffect, useRef } from "react";

type GraphPlaceholderProps = {
  symbol: string;
};

export default function GraphPlaceholder({ symbol }: GraphPlaceholderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const hasSymbol = symbol && symbol.trim() !== "";

  useEffect(() => {
    if (!hasSymbol || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = `
      {
        "allow_symbol_change": true,
        "interval": "D",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "timezone": "Etc/UTC",
        "backgroundColor": "#0F0F0F",
        "gridColor": "rgba(242, 242, 242, 0.06)",
        "symbol": "${symbol}",
        "autosize": true,
        "height": "100%"
      }`;

    containerRef.current.appendChild(script);
  }, [symbol, hasSymbol]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Chart Area
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-100">
            {hasSymbol ? `${symbol} Price Graph` : "No Symbol Selected"}
          </h3>
        </div>
      </div>

      <div className="h-125 rounded-xl border border-slate-700 bg-slate-950/40">
        {hasSymbol ? (
          <div
            ref={containerRef}
            className="tradingview-widget-container h-full w-full"
          >
            <div className="tradingview-widget-container__widget h-full w-full" />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center border border-dashed border-slate-700">
            <p className="text-sm text-slate-500">
              Graph will be shown here
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 