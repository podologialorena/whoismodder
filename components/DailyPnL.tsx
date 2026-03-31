"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function DailyPnL({ data }: { data: { date: string; pnl: number }[] }) {
  return (
    <div className="bg-[#111] rounded-xl p-4 border border-[#222]">
      <h2 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">P&L Diario (ticks)</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fill: "#666", fontSize: 10 }}
            tickFormatter={(v: string) => v.slice(8)}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fill: "#666", fontSize: 11 }} width={40} />
          <Tooltip
            contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8 }}
            labelStyle={{ color: "#999" }}
            formatter={(v) => [`${Number(v) > 0 ? "+" : ""}${v}t`, "P&L"]}
          />
          <Bar dataKey="pnl" radius={[2, 2, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.pnl >= 0 ? "#10b981" : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
