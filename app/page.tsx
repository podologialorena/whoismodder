import dashboardData from "../public/data.json";
import EquityCurve from "../components/EquityCurve";
import DailyPnL from "../components/DailyPnL";
import StatusBadge from "../components/StatusBadge";

const s = dashboardData.stats;

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
      <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Monthly Breakdown</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-[#222]">
            <th className="text-left py-2">Month</th>
            <th className="text-right py-2">P&L</th>
            <th className="text-right py-2">PF</th>
            <th className="text-right py-2">Entries</th>
            <th className="text-right py-2">Days G/R</th>
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
                <span className="text-green-400">{m.daysGreen}G</span>
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

function AccountCard({ name, type, status, current, target }: { name: string; type: string; status: string; current: number; target: number }) {
  const color = type === "lucid" ? "text-purple-400" : "text-blue-400";
  const bg = type === "lucid" ? "bg-purple-400" : "bg-blue-400";
  const pct = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const pnlColor = current > 0 ? "text-green-400" : current < 0 ? "text-red-400" : "text-gray-500";
  return (
    <div className="bg-[#111] rounded-lg p-3 border border-[#222]">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${color}`}>{name}</span>
        <span className="text-xs text-gray-500 uppercase">{status}</span>
      </div>
      <div className="mt-2 w-full bg-[#222] rounded-full h-1.5">
        <div className={`${bg} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className={`text-xs ${pnlColor}`}>${current.toLocaleString()}</span>
        <span className="text-xs text-gray-600">/ ${target.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const winRate = (s.winRate * 100).toFixed(1);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FSTMODEL</h1>
          <p className="text-gray-500 text-sm mt-1">Algorithmic MNQ Futures Trading</p>
        </div>
        <StatusBadge mode={dashboardData.mode ?? "paper"} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Profit Factor" value={`${s.pf}x`} sub="3.99x con tiers (WF 1.32)" />
        <StatCard label="Win Rate" value={`${winRate}%`} sub={`${s.tp}TP ${s.sl}SL ${s.pa}PA`} />
        <StatCard label="Total P&L" value={`+${s.totalPnlTicks}t`} sub={`$${s.totalPnlUsd.toLocaleString()}`} />
        <StatCard label="Entries" value={`${s.entries}`} sub={`${s.tradingDays} trading days`} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Months" value={`${s.monthsGreen}G/${s.monthsRed}R`} sub="All months green" />
        <StatCard label="Weeks" value={`${s.weeksGreen}G/${s.weeksRed}R`} />
        <StatCard label="Avg Win" value={`+${s.avgWin}t`} sub={`Avg Loss: ${s.avgLoss}t`} />
        <StatCard label="Period" value={`${s.dateFrom.slice(5)}`} sub={`to ${s.dateTo.slice(5)}`} />
      </div>

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

      {/* Walk-Forward Validation */}
      <div className="bg-[#111] rounded-xl p-4 border border-[#222] mb-6">
        <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Walk-Forward Validation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Train (Sep 2025 - Jan 2026)</div>
            <div className="text-xl font-bold text-yellow-400">PF 2.98x</div>
            <div className="text-xs text-gray-600">5 meses de entrenamiento</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Test (Feb - Mar 2026)</div>
            <div className="text-xl font-bold text-green-400">PF 3.93x</div>
            <div className="text-xs text-gray-600">datos que nunca vio</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">WF Ratio</div>
            <div className="text-xl font-bold text-green-400">1.32</div>
            <div className="text-xs text-gray-600">test supera al train</div>
          </div>
        </div>
        <div className="border-t border-[#222] pt-3">
          <h3 className="text-xs text-gray-500 uppercase mb-2">Anti Look-Ahead Bias</h3>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span>Pattern detection uses candles [i-3, i-2, i-1], entry at candle i (j=i-2 rule)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span>Institutional levels computed from pre-session data only (PDH, PDL, Asia/London highs-lows)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span>Trade simulation starts at candle i+1 (never same bar as entry signal)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span>Walk-forward test period (Feb-Mar) was never used during development</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span>Test PF 3.93x &gt; Train PF 2.98x (system improves on unseen data)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span>Real MNQ Rithmic futures data (not CFD or synthetic)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Accounts */}
      <div className="mb-8">
        <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Prop Firm Accounts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {dashboardData.accounts.map((a) => (
            <AccountCard key={a.name} name={a.name} type={a.type} status={a.status} current={a.current} target={a.target} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-600 py-6 border-t border-[#181818]">
        <p>Powered by Claude Code & Facundo Garcia</p>
        <p className="mt-2">Contacto: facugarcia656@gmail.com</p>
        <p className="mt-3 text-[10px] text-gray-700">v1.00</p>
      </footer>
    </main>
  );
}
