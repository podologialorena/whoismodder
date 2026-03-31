"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EquityCurve({ data }: { data: { date: string; equity: number }[] }) {
  return (
    <div className="bg-[#111] rounded-xl p-4 border border-[#222]">
      <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Equity Curve (ticks)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: "#666", fontSize: 11 }}
            tickFormatter={(v: string) => v.slice(5)}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fill: "#666", fontSize: 11 }} width={50} />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
            labelStyle={{ color: "#999" }}
            formatter={(v) => [`${Number(v) > 0 ? "+" : ""}${v}t`, "P&L"]}
          />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#eqGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
