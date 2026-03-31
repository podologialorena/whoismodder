"use client";
import { useState } from "react";

export default function ModeSwitch() {
  const [mode, setMode] = useState<"paper" | "live">("paper");
  const isLive = mode === "live";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => setMode(isLive ? "paper" : "live")}
        className="flex items-center gap-3 cursor-pointer group"
        aria-label="Toggle trading mode"
      >
        {/* Label izquierdo */}
        <span className={`text-xs font-medium transition-colors duration-300 ${!isLive ? "text-yellow-400" : "text-gray-600"}`}>
          PAPER
        </span>

        {/* Toggle pill */}
        <div
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            isLive ? "bg-green-500/30 border border-green-500/50" : "bg-yellow-500/20 border border-yellow-500/30"
          }`}
        >
          {/* Sliding dot */}
          <div
            className={`absolute top-1 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
              isLive
                ? "left-7 bg-green-400 shadow-green-400/50"
                : "left-1 bg-yellow-400 shadow-yellow-400/50"
            }`}
          />
          {/* Pulse ring */}
          <div
            className={`absolute top-1 w-4 h-4 rounded-full animate-ping opacity-40 transition-all duration-300 ${
              isLive ? "left-7 bg-green-400" : "left-1 bg-yellow-400"
            }`}
          />
        </div>

        {/* Label derecho */}
        <span className={`text-xs font-medium transition-colors duration-300 ${isLive ? "text-green-400" : "text-gray-600"}`}>
          LIVE
        </span>
      </button>

      {/* Status badge */}
      <span className={`text-[10px] tracking-widest uppercase font-mono transition-colors duration-300 ${
        isLive ? "text-green-500/70" : "text-yellow-500/60"
      }`}>
        {isLive ? "● ejecutando en vivo" : "● simulación activa"}
      </span>
    </div>
  );
}
