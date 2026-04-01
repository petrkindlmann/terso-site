"use client";

import { useState, useEffect, useRef } from "react";

const LINES = [
  { t: "$ terso capture \"switched auth from Firebase to Supabase — row-level security was the dealbreaker\"", c: "cmd", d: 0 },
  { t: "", c: "x", d: 500 },
  { t: "\u25C8 scanning for secrets...", c: "dim", d: 800 },
  { t: "\u2713 clean -- no secrets detected", c: "ok", d: 1300 },
  { t: "\u25C8 classifying fragment...", c: "dim", d: 1600 },
  { t: "  kind: decision  scope: project  confidence: 0.94", c: "stat", d: 2100 },
  { t: "\u2713 captured -- promoted to project context", c: "ok", d: 2600 },
  { t: "", c: "x", d: 3000 },
  { t: "$ terso sync", c: "cmd", d: 3400 },
  { t: "", c: "x", d: 3700 },
  { t: "\u25C8 syncing project omnus...", c: "dim", d: 3900 },
  { t: "  wrote .terso/generated/ARCHITECTURE.md", c: "file", d: 4300 },
  { t: "  wrote .terso/generated/DECISIONS.md", c: "file", d: 4600 },
  { t: "  wrote .terso/generated/DEBUG_LOG.md", c: "file", d: 4900 },
  { t: "  wrote .terso/generated/SHARED_OPS.md", c: "file", d: 5200 },
  { t: "", c: "x", d: 5500 },
  { t: "done -- 4 files written", c: "ok", d: 5700 },
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
      aria-label="Animated terminal showing terso capture and sync commands writing context files for AI agents"
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
          {line.t || "\u00A0"}
        </div>
      ))}
      {started && visible.length < LINES.length && (
        <span className="text-[#8a8a96] animate-blink motion-reduce:animate-none">
          {"\u258C"}
        </span>
      )}
    </div>
  );
}
