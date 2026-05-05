const accountGroups = [
  {
    name: "Apex Trader Funding",
    range: "Apex 01-20",
    count: "20 cuentas",
    status: "16 activas / 4 pausadas",
    risk: "0.25% - 0.5%",
    phase: "evaluacion",
    goal: "goal 2.5%",
    tone: "green",
  },
  {
    name: "Lucid Trading",
    range: "Lucid 01-05",
    count: "5 cuentas",
    status: "4 activas / 1 pausada",
    risk: "0.5%",
    phase: "fondeada",
    goal: "goal 4%",
    tone: "green",
  },
  {
    name: "CFD / FTMO",
    range: "NAS100",
    count: "Proximamente",
    status: "sin enviar",
    risk: "pendiente",
    phase: "proxima integracion",
    goal: "sin goal",
    tone: "amber",
  },
];

const liveActivity = [
  ["14:32:18", "orden ejecutada", "Algoritmo"],
  ["14:32:17", "copia enviada", "Apex 01-16"],
  ["14:32:16", "cuentas pausadas omitidas", "Apex 17-20"],
  ["14:32:15", "riesgo y goal aplicados", "Lucid 01-04"],
  ["14:32:14", "grupo sin enviar", "CFD / FTMO"],
];

const systemStatus = [
  ["orden", "activa"],
  ["copia", "por grupo"],
  ["riesgo", "por cuenta"],
  ["goals", "por grupo"],
];

const flowSections = [
  {
    number: "01",
    label: "Conectar",
    copy: "Conectas cuentas de prop firm y las separas por grupo, etapa y estado.",
    mode: "users",
  },
  {
    number: "02",
    label: "Copiar",
    copy: "El algoritmo ejecuta. El SaaS copia solo a los grupos que tienen permiso.",
    mode: "accounts",
  },
  {
    number: "03",
    label: "Controlar",
    copy: "Pausas cuentas, ajustas riesgo, marcas goals y revisas que recibio cada grupo.",
    mode: "table",
  },
];

const includedItems = [
  {
    title: "Algoritmo",
    copy: "La orden nace en el algoritmo. Mod Menu MNQ la recibe y decide a que grupos se copia.",
  },
  {
    title: "Cuentas de prop firm",
    copy: "Apex, Lucid y proximas integraciones viven separadas por grupo, etapa y estado.",
  },
  {
    title: "Riesgo y goals",
    copy: "Cada grupo puede tener riesgo propio, goal distinto y cuentas pausadas sin frenar todo.",
  },
  {
    title: "Seguimiento",
    copy: "Logs simples para ver que operacion se copio, donde entro y que grupo quedo fuera.",
  },
];

const trackingGroups = [
  {
    name: "Apex Trader Funding",
    phase: "evaluacion",
    goal: "2.5%",
    copied: "3 copias hoy",
    status: "16 activas",
    tone: "green",
  },
  {
    name: "Lucid Trading",
    phase: "fondeada",
    goal: "4%",
    copied: "2 copias hoy",
    status: "4 activas",
    tone: "green",
  },
  {
    name: "CFD / FTMO",
    phase: "proximamente",
    goal: "sin goal",
    copied: "sin enviar",
    status: "preparacion",
    tone: "amber",
  },
];

function StatusDot({ tone = "green" }: { tone?: "green" | "amber" }) {
  const color = tone === "amber" ? "bg-amber-400" : "bg-emerald-400";

  return <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${color}`} />;
}

function IconStack() {
  return (
    <div className="mx-auto grid h-9 w-9 place-items-center rounded-md border border-white/12">
      <div className="space-y-1">
        <span className="block h-px w-4 bg-white/65" />
        <span className="block h-px w-4 bg-white/65" />
        <span className="block h-px w-4 bg-white/65" />
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="relative h-8 w-8 rounded-full border border-white/12">
      <span className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-white/45" />
      <span className="absolute bottom-2 left-1/2 h-2.5 w-4 -translate-x-1/2 rounded-t-full border border-white/45 border-b-0" />
    </div>
  );
}

function MiniNode({
  title,
  label,
  status,
}: {
  title: string;
  label: string;
  status: string;
}) {
  return (
    <div className="connected-node rounded-lg border border-white/12 bg-[#101010]/90 p-5 text-center">
      <IconStack />
      <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-white/75">{title}</p>
      <p className="mt-2 text-xs text-white/38">{label}</p>
      <p className="mt-4 text-xs text-emerald-300">{status}</p>
    </div>
  );
}

function AccountCard({
  group,
}: {
  group: {
    name: string;
    range: string;
    count: string;
    status: string;
    risk: string;
    phase: string;
    goal: string;
    tone: string;
  };
}) {
  const isAmber = group.tone === "amber";

  return (
    <div className="account-card rounded-lg border border-white/12 bg-[#101010]/90">
      <div className="flex items-start justify-between gap-4 p-4">
        <div>
          <p className="text-sm text-white">{group.name}</p>
          <p className="mt-2 text-xs text-white/42">{group.count}</p>
          <p className={isAmber ? "mt-2 text-xs text-amber-300" : "mt-2 text-xs text-emerald-300"}>{group.status}</p>
          <p className="mt-2 text-[11px] text-white/36">{group.phase} / riesgo {group.risk}</p>
          <p className="mt-1 text-[11px] text-white/36">{group.goal}</p>
        </div>
        <StatusDot tone={isAmber ? "amber" : "green"} />
      </div>
      <div className="flex items-center gap-4 border-t border-white/10 px-4 py-3 text-[11px] text-white/45">
        <span>|| pausar</span>
        <span>riesgo</span>
        <span>goal</span>
        <span>logs</span>
      </div>
    </div>
  );
}

function InviteDots() {
  return (
    <div className="mt-12 flex items-center gap-2">
      {[0, 1, 2, 3].map((item) => (
        <UserIcon key={item} />
      ))}
      <div className="ml-3 flex items-center gap-2 text-xs text-white/68">
        <StatusDot />
        <span>5 invitados</span>
      </div>
    </div>
  );
}

function FlowCable({ delay = "0s" }: { delay?: string }) {
  return (
    <div className="flow-cable" aria-hidden="true">
      <span className="flow-cable-line" />
      <span className="flow-cable-pulse" style={{ animationDelay: delay }} />
    </div>
  );
}

function AccountStack() {
  return (
    <div>
      <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/48">Cuentas conectadas</p>
      <div className="account-stack grid gap-4">
        {accountGroups.map((group) => (
          <div key={group.name} className="account-branch">
            <AccountCard group={group} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroMap() {
  return (
    <div className="hero-map relative grid gap-y-5 lg:grid-cols-[0.82fr_86px_0.82fr_86px_1.55fr] lg:items-center lg:gap-x-0">
      <div className="relative">
        <p className="mb-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/42">Orden</p>
        <MiniNode title="Algoritmo" label="orden propia" status="orden activa" />
      </div>
      <FlowCable />
      <div className="relative">
        <p className="mb-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/42">SaaS</p>
        <MiniNode title="Mod Menu MNQ" label="riesgo, goals y copia" status="sincronizando" />
      </div>
      <FlowCable delay="0.9s" />
      <AccountStack />
    </div>
  );
}

function ActivityPanel() {
  return (
    <div className="rounded-lg border border-white/12 bg-[#101010]/70 p-6">
      <p className="text-[10px] uppercase tracking-[0.24em] text-white/48">Actividad en vivo</p>
      <div className="mt-6 space-y-4">
        {liveActivity.map(([time, action, target]) => (
          <div key={`${time}-${action}`} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 text-xs">
            <StatusDot />
            <span className="text-white/45">{time}</span>
            <span className="hidden text-white/58 sm:block">{action}</span>
            <span className="text-white/42">{target}</span>
            <span className="text-emerald-300">ok</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPanel() {
  return (
    <div className="self-start rounded-md border border-white/8 bg-white/[0.018] p-4 lg:max-w-[280px] lg:justify-self-start">
      <p className="text-[9px] uppercase tracking-[0.22em] text-white/36">Estado operativo</p>
      <div className="mt-4 space-y-3">
        {systemStatus.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 text-[11px]">
            <span className="text-white/42">{label}</span>
            <span className="flex items-center gap-2 text-emerald-300/85">
              <StatusDot />
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowVisual({ mode }: { mode: string }) {
  if (mode === "table") {
    return (
      <div className="rounded-lg border border-white/12 bg-[#101010]/70 p-5">
        <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/42">Grupos de cuentas</p>
        {accountGroups.map((group) => (
          <div key={group.name} className="grid gap-3 border-t border-white/10 py-4 first:border-t-0 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
            <span className="text-xs text-white">{group.name}</span>
            <span className="text-xs text-white/42">{group.phase}</span>
            <span className="text-xs text-white/42">{group.goal}</span>
            <span className="flex items-center gap-2 text-xs text-emerald-300">
              <StatusDot tone={group.tone === "amber" ? "amber" : "green"} />
              {group.status}
            </span>
          </div>
        ))}
        <div className="mt-5 flex justify-end">
          <span className="rounded-md border border-white/12 px-3 py-2 text-xs text-white/55">+ nuevo grupo</span>
        </div>
      </div>
    );
  }

  if (mode === "users") {
    return (
      <div className="rounded-lg border border-white/12 bg-[#101010]/70 p-5">
        <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/42">Grupos preparados</p>
        <div className="grid gap-3 md:grid-cols-3">
          {accountGroups.map((group) => (
            <div key={group.name} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs text-white">{group.name}</p>
              <p className="mt-3 text-xs text-white/42">{group.count}</p>
              <p className={group.tone === "amber" ? "mt-3 flex items-center gap-2 text-xs text-amber-300" : "mt-3 flex items-center gap-2 text-xs text-emerald-300"}>
                <StatusDot tone={group.tone === "amber" ? "amber" : "green"} />
                {group.status}
              </p>
              <p className="mt-3 text-[11px] text-white/36">{group.phase}</p>
              <p className="mt-1 text-[11px] text-white/36">riesgo {group.risk} / {group.goal}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/42">Conectar no significa copiar a todas: primero se define etapa, estado, riesgo y goal por grupo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/12 bg-[#101010]/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">Orden desde el algoritmo</p>
          <p className="mt-3 text-lg text-white">Algoritmo / NAS100</p>
        </div>
        <span className="flex items-center gap-2 rounded-md border border-emerald-300/18 px-3 py-2 text-xs text-emerald-300">
          <StatusDot />
          orden lista
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {[
          ["Apex Trader Funding", "evaluacion", "0.25% - 0.5%", "goal 2.5%", "copiar activas", "green"],
          ["Lucid Trading", "fondeada", "0.5%", "goal 4%", "copiar activas", "green"],
          ["CFD / FTMO", "proximamente", "pendiente", "sin goal", "sin enviar", "amber"],
        ].map(([name, phase, risk, goal, action, tone]) => (
          <div key={name} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-xs sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
            <div>
              <p className="text-white">{name}</p>
              <p className="mt-1 text-white/40">{phase}</p>
            </div>
            <span className="text-white/45">riesgo {risk}</span>
            <span className="text-white/45">{goal}</span>
            <span className={tone === "amber" ? "flex items-center gap-2 text-amber-300" : "flex items-center gap-2 text-emerald-300"}>
              <StatusDot tone={tone === "amber" ? "amber" : "green"} />
              {action}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/42">La copia no es global: cada grupo puede estar en evaluacion o fondeada, con riesgo y goal propio.</p>
    </div>
  );
}

function FlowSection({ section }: { section: { number: string; label: string; copy: string; mode: string } }) {
  const isControl = section.mode === "table";

  return (
    <section id={section.label.toLowerCase()} className="border-t border-white/10 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.72fr_1.28fr] md:px-8">
        <div>
          <p className="text-xs text-white/40">{section.number}</p>
          <h2 className="mt-8 text-3xl font-semibold uppercase text-white">{section.label}</h2>
          <div className="mt-5 h-px w-8 bg-white/65" />
          <p className="mt-8 max-w-xs text-sm leading-7 text-white/48">{section.copy}</p>
        </div>
        <div className="space-y-5">
          <FlowVisual mode={section.mode} />
          {isControl ? (
            <div className="grid items-start gap-5 lg:grid-cols-[1fr_280px]">
              <ActivityPanel />
              <StatusPanel />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function PositioningSection() {
  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs text-white/40">00</p>
          <h2 className="mt-8 text-3xl font-semibold uppercase text-white">Que es</h2>
          <div className="mt-5 h-px w-8 bg-white/65" />
          <p className="mt-8 max-w-xs text-sm leading-7 text-white/48">
            Una capa entre el algoritmo y tus cuentas de prop firm. Recibe la orden y la copia segun grupo, estado, riesgo y goal.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {includedItems.map((item) => (
            <div key={item.title} className="rounded-lg border border-white/12 bg-[#101010]/70 p-5">
              <p className="text-sm text-white">{item.title}</p>
              <p className="mt-4 text-xs leading-6 text-white/45">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackingSection() {
  return (
    <section className="border-t border-white/10 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs text-white/40">04</p>
          <h2 className="mt-8 text-3xl font-semibold uppercase text-white">Seguimiento</h2>
          <div className="mt-5 h-px w-8 bg-white/65" />
          <p className="mt-8 max-w-xs text-sm leading-7 text-white/48">
            Cada grupo se mira distinto segun si esta en evaluacion, fondeada o pausada. Lo importante es llevarla ordenada.
          </p>
        </div>

        <div className="grid gap-4">
          {trackingGroups.map((group) => (
            <div key={group.name} className="grid gap-5 rounded-lg border border-white/12 bg-[#101010]/70 p-5 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
              <div>
                <p className="text-sm text-white">{group.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/38">{group.phase}</p>
              </div>
              <span className="text-xs text-white/45">goal {group.goal}</span>
              <span className="text-xs text-white/45">{group.copied}</span>
              <span className={group.tone === "amber" ? "flex items-center gap-2 text-xs text-amber-300" : "flex items-center gap-2 text-xs text-emerald-300"}>
                <StatusDot tone={group.tone === "amber" ? "amber" : "green"} />
                {group.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-xs md:px-8">
        <p className="text-base font-semibold text-white">whoismodder</p>
        <div className="flex items-center gap-6 text-white/58">
          <span className="hidden items-center gap-2 sm:flex">
            <StatusDot />
            operando en vivo
          </span>
        </div>
      </header>

      <section className="mx-auto grid min-h-[760px] max-w-6xl gap-14 px-5 pb-16 pt-20 md:px-8 lg:grid-cols-[0.8fr_1.45fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/42">Mod Menu MNQ v1</p>
          <h1 className="mt-7 max-w-lg text-4xl font-semibold leading-tight text-white md:text-5xl">
            El algoritmo opera. Tus cuentas copian.
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-white/58">
            La orden nace en el algoritmo. Mod Menu MNQ la copia a tus cuentas de prop firm segun grupo, riesgo, pausas y goals.
          </p>

          <div className="mt-12 space-y-4 text-sm text-white/62">
            <p className="flex items-center gap-3">
              <StatusDot />
              20 Apex y 5 Lucid conectadas por grupo
            </p>
            <p>Evaluacion o fondeada, cada grupo con su regla.</p>
          </div>

          <button
            type="button"
            disabled
            className="mt-12 inline-flex h-14 min-w-64 cursor-not-allowed items-center justify-center rounded-md border border-white/14 bg-white/10 px-6 text-sm font-medium text-white/55"
          >
            acceso limitado
          </button>

          <InviteDots />
        </div>

        <HeroMap />
      </section>

      <PositioningSection />

      {flowSections.map((section) => (
        <FlowSection key={section.number} section={section} />
      ))}

      <TrackingSection />
    </main>
  );
}
