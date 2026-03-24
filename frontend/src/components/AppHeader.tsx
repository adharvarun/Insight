import Image from "next/image";

export default function AppHeader() {
  return (
    <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-[0_0_0_1px_rgba(148,163,184,0.05)] backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight text-slate-100">
            Insight
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">
            Where data becomes decisions
          </p>
        </div>
        <Image width={70} height={70} src="/Logo.png" alt="Logo" className="border-black border-1 rounded-full" />
      </div>
    </header>
  );
}
