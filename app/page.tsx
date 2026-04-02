import dashboardData from "../public/data.json";
import EquityCurve from "../components/EquityCurve";
import DailyPnL from "../components/DailyPnL";
import StatusBadge from "../components/StatusBadge";

const s = dashboardData.stats;
const wf = (dashboardData as Record<string, unknown>).walkForward as
  { trainPF: number; testPF: number; retention: number; trainPeriod: string; testPeriod: string } | undefined;

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#111] rounded-xl p-4 border border-[#222]">
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

function MonthlyTable() {
  return (
    <div className="bg-[#111] rounded-xl p-4 border border-[#222] overflow-x-auto">
      <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Desglose Mensual</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-[#222]">
            <th className="text-left py-2">Mes</th>
            <th className="text-right py-2">P&L</th>
            <th className="text-right py-2">PF</th>
            <th className="text-right py-2">Entries</th>
            <th className="text-right py-2">Dias V/R</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.monthly.map((m) => (
            <tr key={m.month} className="border-b border-[#181818]">
              <td className="py-2">{m.month}</td>
              <td className={`text-right py-2 ${m.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                {m.pnl > 0 ? "+" : ""}{m.pnl}t
              </td>
              <td className="text-right py-2">{m.pf}x</td>
              <td className="text-right py-2">{m.entries}</td>
              <td className="text-right py-2">
                <span className="text-green-400">{m.daysGreen}V</span>
                <span className="text-gray-600">/</span>
                <span className="text-red-400">{m.daysRed}R</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AccountPill({ name, color }: { name: string; color: string }) {
  return (
    <div className="bg-[#111] rounded-lg px-4 py-2 border border-[#222] text-center">
      <span className={`text-sm font-medium ${color}`}>{name}</span>
    </div>
  );
}

export default function Home() {
  const winRate = (s.winRate * 100).toFixed(0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">V5.1</h1>
          <p className="text-gray-500 text-sm mt-1">Trading algoritmico de futuros MNQ — nuevo motor de liquidez</p>
        </div>
        <StatusBadge mode={dashboardData.mode ?? "paper"} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Profit Factor" value={`${s.pf}x`} />
        <StatCard label="Tasa de acierto" value={`${winRate}%`} sub={`${s.tp} ganadas, ${s.sl} perdidas`} />
        <StatCard label="P&L Total" value={`+${s.totalPnlTicks}t`} sub={`${s.entries} operaciones`} />
        <StatCard label="Operaciones" value={`${s.entries}`} sub={`${s.tradingDays} dias operados`} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Meses" value={`${s.monthsGreen}V/${s.monthsRed}R`} sub="Todos los meses en verde" />
        <StatCard label="Semanas" value={`${s.weeksGreen}V/${s.weeksRed}R`} />
        <StatCard label="Ganancia prom." value={`+${s.avgWin}t`} sub={`Perdida prom: ${s.avgLoss}t`} />
        <StatCard label="Periodo" value={`${s.dateFrom.slice(5)}`} sub={`al ${s.dateTo.slice(5)}`} />
      </div>

      {/* Walk-Forward Validation */}
      {wf && (
        <div className="bg-[#111] rounded-xl p-4 border border-[#222] mb-6">
          <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Validacion Walk-Forward</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Entrenamiento ({wf.trainPeriod})</div>
              <div className="text-xl font-bold text-yellow-400">PF {wf.trainPF}x</div>
              <div className="text-xs text-gray-600">datos de entrenamiento</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Test ({wf.testPeriod})</div>
              <div className="text-xl font-bold text-green-400">PF {wf.testPF}x</div>
              <div className="text-xs text-gray-600">datos que nunca vio el sistema</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Retencion</div>
              <div className="text-xl font-bold text-green-400">{wf.retention}%</div>
              <div className="text-xs text-gray-600">test replica al entrenamiento</div>
            </div>
          </div>
          <div className="border-t border-[#222] pt-3">
            <h3 className="text-xs text-gray-500 uppercase mb-2">Sin Look-Ahead Bias</h3>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Deteccion de patrones usa solo velas pasadas, la entry es en la vela actual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Niveles calculados solo con data pre-sesion (PDH, PDL, Asia, Londres)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>La simulacion arranca en la vela siguiente a la senal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>El periodo de test nunca se uso durante el desarrollo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span>Data real de futuros MNQ via Rithmic (no CFD ni sinteticos)</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Equity Curve */}
      <div className="mb-6">
        <EquityCurve data={dashboardData.equity} />
      </div>

      {/* Daily P&L */}
      <div className="mb-6">
        <DailyPnL data={dashboardData.daily} />
      </div>

      {/* Monthly Table */}
      <div className="mb-6">
        <MonthlyTable />
      </div>

      {/* Accounts */}
      <div className="mb-6">
        <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Cuentas abiertas en Apex</h2>
        <div className="grid grid-cols-3 gap-3">
          <AccountPill name="Apex 01" color="text-blue-400" />
          <AccountPill name="Apex 02" color="text-blue-400" />
          <AccountPill name="Apex 03" color="text-blue-400" />
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Cuentas abiertas en Lucid</h2>
        <div className="grid grid-cols-3 gap-3">
          <AccountPill name="Lucid 01" color="text-purple-400" />
          <AccountPill name="Lucid 02" color="text-purple-400" />
          <AccountPill name="Lucid 03" color="text-purple-400" />
        </div>
      </div>

      {/* Changelog */}
      <div className="bg-[#111] rounded-xl p-4 border border-[#222] mb-6">
        <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Changelog</h2>
        <div className="text-xs text-gray-400 leading-relaxed">
          <p className="mb-2">
            <span className="text-gray-300 font-medium">2 Abril 2026 — V5.1: nuevo motor de liquidez</span>
          </p>
          <p>
            V5 automatiza la estrategia de Facundo Garcia, desarrollada junto con Claude.
            Hoy se activa V5.1, que suma un segundo motor basado en trampas de liquidez
            entre sesiones (Londres y Nueva York). Ambos motores operan juntos de forma coordinada.
            322 operaciones en 7 meses de prueba, 73% de acierto, todos los meses positivos.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 py-6 border-t border-[#181818]">
        <p>Powered by Claude Code & Facundo Garcia</p>
        <p className="mt-2">Contacto: facugarcia656@gmail.com</p>
        <p className="mt-3 text-[10px] text-gray-700">v5.1</p>
      </footer>
    </main>
  );
}
