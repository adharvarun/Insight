"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type ExplanationPanelProps = {
  symbol: string;
};

export default function ExplanationPanel({symbol}: ExplanationPanelProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState("");

  const cleanAnswer = (text: string) => {
    return text
      .replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  const getExplanation = async (inputSymbol: string) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/explain", {
        symbol: inputSymbol,
      });
      const explanation = cleanAnswer(res.data?.content) || "No explanation available.";
      setExplanation(explanation);
      setShowExplanation(true);
    } catch (err) {
      console.error("Error fetching explanation:", err);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Model Interpretation
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-100">
              Explain Prediction
            </h3>
          </div>
          <button
            type="button"
            onClick={() => getExplanation(symbol)}
            className="h-11 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Explain Prediction
          </button>
        </div>
        {showExplanation ? (
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
            <span className="text-sm leading-7 text-slate-200">
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </span>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="text-sm text-slate-500">
              Click the button to view the prediction explanation
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
