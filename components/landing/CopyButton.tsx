"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback not needed for modern browsers
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[#141418] text-[#e8e6e3] font-mono text-[13px] font-medium min-h-[44px] hover:bg-[#1a1a1f] transition-colors cursor-pointer border border-[#222228]"
      title="Click to copy"
      type="button"
    >
      <span>{text}</span>
      <span className="text-[#55555e] group-hover:text-[#8a8a96] text-xs transition-colors">
        {copied ? "\u2713" : "\u2398"}
      </span>
    </button>
  );
}
