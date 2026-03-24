"use client";

import AppHeader from "@/components/AppHeader";
import ExplanationPanel from "@/components/ExplanationPanel";
import GraphPlaceholder from "@/components/GraphPlaceholder";
import PredictionMetrics from "@/components/PredictionMetrics";
import PriceOverview from "@/components/PriceOverview";
import SymbolSearchCard from "@/components/SymbolSearchCard";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [marketSnapshot, setMarketSnapshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const fallbackSnapshot = {
    symbol: "",
    companyName: "",
    currentPrice: "_",
    priceChange: "_",
    open: "_",
    high: "_",
    low: "_",
    volume: "_",
    marketCap: "_",
    prediction: "_",
    signal: "_",
    evaluation: {
      mae: "_",
      mse: "_",
      rmse: "_",
      r2: "_",
    },
  };

  const safeSnapshot = marketSnapshot || fallbackSnapshot;

  const fetchSnapshot = async (inputSymbol: string) => {
    if (!inputSymbol) return;

    setLoading(true);
    try {
      const [infoRes, predictionRes] = await Promise.all([
        axios.post("http://127.0.0.1:8000/info", {
          symbol: inputSymbol,
        }),
        axios.post("http://127.0.0.1:8000/predict", {
          symbol: inputSymbol,
        }),
      ]);

      const infoData = infoRes.data?.[0] || {};
      const predictionData = predictionRes.data || {};

      setMarketSnapshot({
        ...fallbackSnapshot,
        ...infoData,
        ...predictionData,
      });
    } catch (err) {
      console.error(err);
      setMarketSnapshot(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <AppHeader />

        <SymbolSearchCard onSearch={fetchSnapshot} loading={loading} />

        <PriceOverview snapshot={safeSnapshot} />

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <GraphPlaceholder symbol={safeSnapshot.symbol} />
          <PredictionMetrics snapshot={safeSnapshot} />
        </section>

        <ExplanationPanel symbol={safeSnapshot.symbol} />
      </main>
      <div className="flex justify-center pb-3">
        <p className="text-gray-400">Made with ❤️ by <a href="https://www.adharvarun.tech/">Adharv Arun</a></p>
      </div>
    </div>
  );
}