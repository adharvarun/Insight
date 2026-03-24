type Snapshot = {
  symbol: string;
  companyName: string;
  currentPrice: string;
  priceChange: string;
  open: string;
  high: string;
  low: string;
  volume: string;
  marketCap: string;
};

type PriceOverviewProps = {
  snapshot: Snapshot;
};

export default function PriceOverview({ snapshot }: PriceOverviewProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Live Snapshot
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-100">
              {snapshot.symbol}
              <span className="ml-2 text-base font-medium text-slate-400">
                {snapshot.companyName}
              </span>
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-3xl font-semibold text-slate-100">
              {snapshot.currentPrice}
            </p>
            <p className="text-sm font-medium text-emerald-400">
              {snapshot.priceChange}
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <MetricItem label="Open" value={snapshot.open} />
          <MetricItem label="Day High" value={snapshot.high} />
          <MetricItem label="Day Low" value={snapshot.low} />
          <MetricItem label="Volume" value={snapshot.volume} />
          <MetricItem label="Market Cap" value={snapshot.marketCap} />
        </div>
      </div>
    </section>
  );
}

type MetricItemProps = {
  label: string;
  value: string;
};

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}
