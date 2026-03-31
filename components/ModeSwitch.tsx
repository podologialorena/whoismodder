"use client";
import { useState } from "react";

export default function ModeSwitch() {
  const [mode, setMode] = useState<"paper" | "live">("paper");

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${mode === "live" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`} />
      <button
        onClick={() => setMode(mode === "paper" ? "live" : "paper")}
        className="text-sm hover:opacity-80 transition-opacity cursor-pointer"
      >
        <span className={mode === "paper" ? "text-yellow-400" : "text-green-400"}>
          {mode === "paper" ? "Paper Trading" : "Live Trading"}
        </span>
      </button>
    </div>
  );
}
