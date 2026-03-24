type Snapshot = {
  prediction: string;
  signal: string;
  evaluation: {
    mae: string;
    mse: string;
    rmse: string;
    r2: string;
  }; 
};

type PredictionMetricsProps = {
  snapshot: Snapshot;
};

export default function PredictionMetrics({
  snapshot,
}: PredictionMetricsProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Prediction Metrics
      </p>
      <div className="mt-4 grid gap-3">
        <MetricCard label="Predicted Price" value={`$${snapshot.prediction}`} />
        <MetricCard label="Signal" value={snapshot.signal} />
        <MetricCard label="Mean Average Error" value={snapshot.evaluation.mae} />
        <MetricCard label="Mean Squared Error" value={snapshot.evaluation.mse} />
        <MetricCard label="Root of Mean Squared Error" value={snapshot.evaluation.rmse} />
        <MetricCard label="R&sup2; Score" value={snapshot.evaluation.r2} />
      </div>
    </section>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-cyan-300">{value}</p>
    </div>
  );
}
