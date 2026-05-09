"use client";

import { useState, useEffect, useRef } from "react";

const LINES = [
  { t: "$ terso init", c: "cmd", d: 0 },
  { t: "", c: "x", d: 400 },
  { t: "Detected project: \"my-app\" (from package.json)", c: "dim", d: 600 },
  { t: "✓ Terso initialized.", c: "ok", d: 1000 },
  { t: "  AGENTS.md:  scaffolded at project root", c: "stat", d: 1300 },
  { t: "", c: "x", d: 1700 },
  { t: "$ vim AGENTS.md   # add your project conventions", c: "cmd", d: 2000 },
  { t: "$ terso emit", c: "cmd", d: 2700 },
  { t: "", c: "x", d: 3000 },
  { t: "  create   CLAUDE.md", c: "file", d: 3300 },
  { t: "  create   .cursorrules", c: "file", d: 3600 },
  { t: "  create   .github/copilot-instructions.md", c: "file", d: 3900 },
  { t: "", c: "x", d: 4200 },
  { t: "✓ Emitted 3 file(s) from AGENTS.md (0 unchanged).", c: "ok", d: 4400 },
  { t: "", c: "x", d: 4800 },
  { t: "$ terso emit --check    # CI gate against drift", c: "cmd", d: 5100 },
  { t: "", c: "x", d: 5400 },
  { t: "✓ All 3 target(s) up to date.", c: "ok", d: 5700 },
];

const COLORS: Record<string, string> = {
  cmd: "#d6d3d1",
  ok: "#4ade80",
  file: "#818cf8",
  stat: "#93c5fd",
  dim: "#57534e",
  x: "transparent",
};

export function Terminal() {
  const [visible, setVisible] = useState<typeof LINES>([]);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(LINES);
      return;
    }

    const timers = LINES.map((line) =>
      setTimeout(() => setVisible((prev) => [...prev, line]), line.d),
    );
    return () => timers.forEach(clearTimeout);
  }, [started]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visible]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Animated terminal showing terso init scaffolding AGENTS.md and terso emit compiling it into CLAUDE.md, .cursorrules, and copilot-instructions.md"
      className="bg-[#0a0a0d] rounded-xl p-3.5 sm:px-[22px] sm:py-[18px] font-mono text-[11.5px] sm:text-[13px] leading-[1.7] max-h-[380px] sm:max-h-[440px] overflow-hidden overflow-x-auto touch-pan-x border border-[#222228]"
    >
      <div className="flex gap-1.5 mb-2 sm:mb-3">
        {["#ef4444", "#eab308", "#22c55e"].map((color) => (
          <div
            key={color}
            className="w-2 h-2 rounded-full opacity-60"
            style={{ background: color }}
          />
        ))}
      </div>
      {visible.map((line, i) => (
        <div
          key={i}
          className="whitespace-pre-wrap break-words animate-line-in motion-reduce:animate-none motion-reduce:opacity-100"
          style={{
            color: COLORS[line.c],
            fontWeight: line.c === "cmd" ? 600 : 400,
          }}
        >
          {line.t || " "}
        </div>
      ))}
      {started && visible.length < LINES.length && (
        <span className="text-[#8a8a96] animate-blink motion-reduce:animate-none">
          {"▌"}
        </span>
      )}
    </div>
  );
}
