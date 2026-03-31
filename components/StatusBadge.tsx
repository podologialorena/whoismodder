export default function StatusBadge({ mode }: { mode: string }) {
  const isLive = mode === "live";
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
      <span className={`text-sm font-medium ${isLive ? "text-green-400" : "text-yellow-400"}`}>
        {isLive ? "Operando en vivo" : "Paper Trading"}
      </span>
    </div>
  );
}
