"use client";

import { useState, useEffect, useRef } from "react";

const STEPS = [
  { name: "Secret scan", detail: "22 patterns", color: "#ef4444" },
  { name: "Segment", detail: "split topics", color: "#f59e0b" },
  { name: "Classify", detail: "scope + kind", color: "#3b82f6" },
  { name: "Deduplicate", detail: "hash + fuzzy", color: "#a855f7" },
  { name: "Embed", detail: "768-dim vector", color: "#14b8a6" },
  { name: "Route", detail: "confidence 0.94", color: "#818cf8" },
];

export function AnimatedPipeline() {
  const [activeStep, setActiveStep] = useState(-1);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= STEPS.length) {
        clearInterval(interval);
        // Loop after a pause
        setTimeout(() => {
          setActiveStep(-1);
          setTimeout(() => setStarted(false), 300);
          setTimeout(() => setStarted(true), 800);
        }, 2000);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [started]);

  return (
    <div ref={ref} className="bg-[#141418] rounded-xl p-3.5 sm:p-5 border border-[#222228]">
      <p className="text-[11px] font-semibold text-[#55555e] tracking-[0.06em] uppercase mb-3">
        Processing pipeline
      </p>
      {STEPS.map((step, i) => {
        const isActive = i <= activeStep;
        const isCurrent = i === activeStep;

        return (
          <div
            key={step.name}
            className={`flex justify-between items-center py-[7px] transition-all duration-300 ${
              i < STEPS.length - 1 ? "border-b border-[#1a1a1f]" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: isActive ? step.color : "#2e2e36",
                  boxShadow: isCurrent
                    ? `0 0 8px ${step.color}80`
                    : "none",
                }}
              />
              <span
                className="text-sm font-mono transition-colors duration-300"
                style={{
                  color: isActive ? "#e8e6e3" : "#55555e",
                }}
              >
                {step.name}
              </span>
            </div>
            <span
              className="text-[11px] font-mono transition-all duration-300"
              style={{
                color: isActive ? step.color : "#2e2e36",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(4px)",
              }}
            >
              {isActive ? step.detail : ""}
            </span>
          </div>
        );
      })}

      {/* Progress bar */}
      <div className="mt-3 h-[2px] rounded-full bg-[#1a1a1f] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: activeStep >= 0 ? `${((activeStep + 1) / STEPS.length) * 100}%` : "0%",
            background: activeStep >= 0
              ? `linear-gradient(90deg, ${STEPS[0].color}, ${STEPS[Math.min(activeStep, STEPS.length - 1)].color})`
              : "transparent",
          }}
        />
      </div>
    </div>
  );
}
