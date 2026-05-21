"use client";

import { useState, useEffect } from "react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c0c0f]/95 backdrop-blur-xl border-b border-[#222228]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-base tracking-[-0.04em] no-underline text-[#e8e6e3] font-mono">
          terso
        </a>
        <div className="flex items-center gap-1.5 sm:gap-4">
          <a
            href="/docs"
            className="text-[13px] font-medium text-[#55555e] no-underline p-2 hover:text-[#8a8a96] transition-colors"
          >
            Docs
          </a>
          <a
            href="/blog"
            className="text-[13px] font-medium text-[#55555e] no-underline p-2 hover:text-[#8a8a96] transition-colors"
          >
            Blog
          </a>
          <a
            href="https://github.com/petrkindlmann/terso-cli"
            target="_blank"
            rel="noopener"
            className="text-[13px] font-medium text-[#55555e] no-underline p-2 hover:text-[#8a8a96] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/terso-cli"
            target="_blank"
            rel="noopener"
            className="text-[13px] font-medium text-[#55555e] no-underline p-2 hover:text-[#8a8a96] transition-colors"
          >
            npm
          </a>
          <a
            href="/docs/getting-started"
            className="hidden sm:flex items-center px-4 py-2 text-[13px] font-semibold rounded-lg bg-indigo-500 text-white no-underline ml-1 hover:bg-indigo-600 transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
