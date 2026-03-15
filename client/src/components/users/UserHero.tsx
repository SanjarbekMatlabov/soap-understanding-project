type UserHeroProps = {
  recordCount: number;
  isEditing: boolean;
};

const statCards = (recordCount: number, isEditing: boolean) => [
  {
    label: "Records",
    value: recordCount.toString().padStart(2, "0"),
    accent: "from-cyan-500/30 to-blue-500/10",
  },
  {
    label: "Mode",
    value: isEditing ? "EDIT" : "CREATE",
    accent: "from-fuchsia-500/30 to-violet-500/10",
  },
  {
    label: "Transport",
    value: "SOAP/XML",
    accent: "from-emerald-500/30 to-teal-500/10",
  },
];

export function UserHero({ recordCount, isEditing }: UserHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_0_80px_rgba(14,165,233,0.12)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),transparent_40%,rgba(217,70,239,0.08))]" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Neural User Control
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              SOAP User CRUD Command Center
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              High-contrast client console for creating, syncing, updating, and deleting user records through your SOAP backend.
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {statCards(recordCount, isEditing).map((card) => (
            <div
              key={card.label}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${card.accent} p-[1px]`}
            >
              <div className="rounded-[calc(1.5rem-1px)] bg-slate-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
                <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
