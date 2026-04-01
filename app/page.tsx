import { NavBar } from "../components/landing/NavBar";
import { Terminal } from "../components/landing/Terminal";
import { Reveal } from "../components/landing/Reveal";
import { CopyButton } from "../components/landing/CopyButton";
import { AnimatedPipeline } from "../components/landing/AnimatedPipeline";

// -- Pre-computed code blocks (runs once at build time) --

const CAPTURE_CODE = [
  { c: "#d6d3d1", t: "$ terso capture \\" },
  { c: "#86efac", t: '  "switched auth to Supabase --' },
  { c: "#86efac", t: '   row-level security was the dealbreaker"' },
  { c: "#57534e", t: "" },
  { c: "#4ade80", t: "\u2713 captured" },
  { c: "#93c5fd", t: "  kind: decision  scope: project" },
  { c: "#93c5fd", t: "  confidence: 0.94  class: promote_now" },
];

const SYNC_CODE = [
  { c: "#d6d3d1", t: "$ terso sync" },
  { c: "#57534e", t: "" },
  { c: "#57534e", t: "\u25C8 syncing project omnus..." },
  { c: "#818cf8", t: "  wrote .terso/generated/ARCHITECTURE.md" },
  { c: "#818cf8", t: "  wrote .terso/generated/DECISIONS.md" },
  { c: "#818cf8", t: "  wrote .terso/generated/DEBUG_LOG.md" },
  { c: "#818cf8", t: "  wrote .terso/generated/SHARED_OPS.md" },
  { c: "#57534e", t: "" },
  { c: "#4ade80", t: "done -- 4 files written" },
];

const AGENT_FILES = [
  { name: "ARCHITECTURE.md", desc: "Current stack, infra, deployment" },
  { name: "DECISIONS.md", desc: "Why you chose X over Y" },
  { name: "DEBUG_LOG.md", desc: "Bugs fixed, root causes found" },
  { name: "SHARED_OPS.md", desc: "Cross-project standards and recipes" },
  { name: "CHANGELOG.md", desc: "What changed, when, why" },
];

const SURFACES = [
  "CLI",
  "Telegram",
  "Web paste",
  "GitHub webhooks",
  "Email forwarding",
  "n8n webhooks",
];

const PIPELINE_STEPS = [
  { name: "Secret scan", status: "pass", color: "#4ade80" },
  { name: "Segment", status: "pass", color: "#4ade80" },
  { name: "Classify", status: "pass", color: "#4ade80" },
  { name: "Deduplicate", status: "pass", color: "#4ade80" },
  { name: "Embed", status: "pass", color: "#4ade80" },
  { name: "Route", status: "pass", color: "#4ade80" },
];

const TREE_LINES = [
  { t: "your-project/", indent: 0, gen: false },
  { t: "src/", indent: 1, gen: false },
  { t: "package.json", indent: 1, gen: false },
  { t: "CLAUDE.md", indent: 1, gen: false, label: "hand-maintained" },
  { t: ".terso/", indent: 1, gen: false },
  { t: "config.json", indent: 2, gen: false, label: "hand-maintained" },
  { t: "generated/", indent: 2, gen: true },
  { t: "ARCHITECTURE.md", indent: 3, gen: true, label: "auto-generated" },
  { t: "DECISIONS.md", indent: 3, gen: true, label: "auto-generated" },
  { t: "DEBUG_LOG.md", indent: 3, gen: true, label: "auto-generated" },
  { t: "SHARED_OPS.md", indent: 3, gen: true, label: "auto-generated" },
];

const GRID_CARDS = [
  { title: "Offline mode", desc: "Capture locally when offline. Sync when you reconnect. Nothing is lost." },
  { title: "Secret scanning", desc: "Deterministic regex before any LLM call. API keys, tokens, passwords stripped automatically." },
  { title: "Confidence routing", desc: "High confidence auto-promotes. Low confidence holds for review. Junk expires and self-cleans." },
  { title: "Shared ops", desc: "Cross-project standards compiled once, synced to every repo. Deploy recipes, coding standards, service inventory." },
  { title: "Review budget", desc: "Maximum 20 items per week. Overflow auto-archives. Your attention is protected." },
  { title: "Cost tracking", desc: "Every LLM call logged with model, tokens, cost, and project. $15/day cap enforced." },
];

const AGENTS = ["Cursor", "Claude Code", "Copilot", "Windsurf"];

// -- Inline code tag (server component) --

function Cd({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[#1a1a1f] px-1.5 py-px rounded text-[0.88em] font-mono text-[#e8e6e3]">
      {children}
    </code>
  );
}

// -- Page (server component) --

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0f] text-[#e8e6e3]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-[#141418] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
        Skip to content
      </a>

      <NavBar />

      <main id="main-content">
        {/* -- HERO -- */}
        <section className="max-w-[560px] mx-auto pt-[100px] sm:pt-36 pb-6 sm:pb-9 px-5 sm:px-6 text-center">
          <p
            className="text-[15px] font-semibold text-indigo-400 mb-3.5 sm:mb-[18px] opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Local context compiler
          </p>
          <h1
            className="text-[30px] sm:text-[40px] lg:text-5xl font-bold tracking-[-0.035em] leading-[1.18] sm:leading-[1.12] text-[#e8e6e3] opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Your AI agents finally have a memory
          </h1>
          <p
            className="text-base text-[#8a8a96] leading-relaxed mt-3.5 sm:mt-[18px] max-w-[420px] mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            Capture decisions and architecture notes from anywhere. Terso compiles them into structured Markdown that Cursor and Claude Code read natively.
          </p>
          <div
            className="flex gap-2.5 justify-center mt-6 sm:mt-7 flex-wrap opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <CopyButton text="npm i -g terso-cli" />
            <a
              href="/docs"
              className="px-5 py-3 rounded-[10px] border border-[#2e2e36] text-[#8a8a96] text-sm font-semibold no-underline min-h-[44px] flex items-center hover:border-[#55555e] hover:text-[#e8e6e3] transition-colors"
            >
              Read the docs
            </a>
          </div>
          <p
            className="text-[13px] text-[#55555e] mt-3.5 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            Open source &middot; MIT &middot; Free while in beta
          </p>
          <div
            className="flex gap-2.5 sm:gap-4 justify-center flex-wrap mt-[18px] sm:mt-[22px] opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            {AGENTS.map((agent) => (
              <span key={agent} className="text-xs font-medium text-[#55555e] tracking-wide">
                {agent}
              </span>
            ))}
          </div>
        </section>

        {/* -- Terminal -- */}
        <section className="max-w-[560px] mx-auto pt-3 pb-16 sm:pb-24 px-5 sm:px-6">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <Terminal />
          </div>
        </section>

        {/* -- PROBLEM -- */}
        <section className="border-t border-[#222228] py-12 sm:py-[72px] px-5 sm:px-6">
          <div className="max-w-[480px] mx-auto">
            <Reveal>
              <p className="text-[13px] font-semibold text-indigo-400 mb-3.5">The problem</p>
              <p className="text-base text-[#8a8a96] leading-[1.7]">
                You open Claude Code on a project you haven&apos;t touched in 3 weeks. It knows nothing &mdash; your architecture decisions, the bug you fixed, why you chose Supabase over Firebase. You re-explain everything. Again.
              </p>
              <p className="text-base text-[#8a8a96] leading-[1.7] mt-3.5">
                Your knowledge is scattered across chat histories, random docs, and your head. Every new session starts from zero.
              </p>
              <p className="text-base text-[#e8e6e3] leading-[1.7] mt-3.5 font-semibold">
                Terso fixes this.
              </p>
            </Reveal>
          </div>
        </section>

        {/* -- HOW IT WORKS -- */}
        <section className="max-w-[960px] mx-auto py-12 sm:pt-16 pb-16 sm:pb-24 px-5 sm:px-6">
          <Reveal>
            <p className="text-[13px] font-semibold text-indigo-400 mb-2.5">How it works</p>
            <h2 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.03em]">
              Capture once. Agents remember forever.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-9">
            <Reveal delay={60}>
              <p className="text-[11px] font-semibold text-[#55555e] tracking-[0.06em] uppercase mb-2">
                You run this
              </p>
              <div className="bg-[#0a0a0d] rounded-xl p-3.5 sm:px-[22px] sm:py-[18px] font-mono text-[11px] sm:text-xs leading-[1.8] overflow-x-auto touch-pan-x">
                {CAPTURE_CODE.map((line, i) => (
                  <div
                    key={i}
                    className="whitespace-pre-wrap break-words"
                    style={{ color: line.c }}
                  >
                    {line.t || "\u00A0"}
                  </div>
                ))}
                <div className="h-3" />
                {SYNC_CODE.map((line, i) => (
                  <div
                    key={`s${i}`}
                    className="whitespace-pre-wrap break-words"
                    style={{ color: line.c }}
                  >
                    {line.t || "\u00A0"}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[11px] font-semibold text-[#55555e] tracking-[0.06em] uppercase mb-2">
                Your agent reads this
              </p>
              <div className="bg-[#141418] rounded-xl p-3.5 sm:p-[18px] border border-[#222228]">
                {AGENT_FILES.map((file, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 py-2.5 ${i < AGENT_FILES.length - 1 ? "border-b border-[#1a1a1f]" : ""}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-[13px] font-mono text-[#e8e6e3] font-medium">
                        {file.name}
                      </span>
                      <span className="text-xs text-[#55555e] ml-2">
                        {file.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -- FEATURES -- */}
        <section className="max-w-[960px] mx-auto px-5 sm:px-6">
          <Reveal>
            <p className="text-[13px] font-semibold text-indigo-400 mb-1">Capabilities</p>
          </Reveal>

          {/* Capture surfaces */}
          <Reveal delay={30}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 py-8 sm:py-11 border-t border-[#222228]">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-2.5">
                  Capture from anywhere.
                </h3>
                <p className="text-base text-[#8a8a96] leading-[1.65]">
                  Voice notes from Telegram, quick thoughts from the CLI, pastes from the web, GitHub webhooks, forwarded emails. Under 3 seconds to capture a thought. Zero friction, zero context switching.
                </p>
              </div>
              <div className="bg-[#141418] rounded-xl p-3.5 sm:p-5 border border-[#222228]">
                <div className="grid grid-cols-2 gap-2">
                  {SURFACES.map((surface) => (
                    <div
                      key={surface}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#0c0c0f] border border-[#1a1a1f]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span className="text-sm text-[#8a8a96] font-medium">{surface}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Secret scanning + pipeline */}
          <Reveal delay={30}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 py-8 sm:py-11 border-t border-[#222228]">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-2.5">
                  Secrets scanned before any LLM.
                </h3>
                <p className="text-base text-[#8a8a96] leading-[1.65]">
                  Deterministic regex scanning runs before any AI model sees your input. API keys, tokens, passwords, and connection strings are stripped and replaced with <Cd>[REDACTED:type]</Cd> markers. The originals are stored encrypted in a local vault.
                </p>
              </div>
              <AnimatedPipeline />
            </div>
          </Reveal>

          {/* Files not APIs */}
          <Reveal delay={30}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 py-8 sm:py-11 border-t border-[#222228]">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] mb-2.5">
                  Files, not APIs.
                </h3>
                <p className="text-base text-[#8a8a96] leading-[1.65]">
                  No MCP servers, no authentication complexity, no API calls at runtime. Terso writes Markdown files into <Cd>.terso/generated/</Cd> in each project repo. Any file-aware agent reads them naturally. Hand-maintained docs stay separate from generated context.
                </p>
              </div>
              <div className="bg-[#141418] rounded-xl p-3.5 sm:p-5 border border-[#222228]">
                <div className="font-mono text-[11.5px] sm:text-[12.5px] leading-[1.8]">
                  {TREE_LINES.map((line, i) => (
                    <div key={i} className="flex items-center gap-0">
                      <span
                        className={line.gen ? "text-indigo-400" : "text-[#8a8a96]"}
                        style={{ paddingLeft: `${line.indent * 16}px` }}
                      >
                        {line.t}
                      </span>
                      {line.label && (
                        <span className={`ml-2 text-[10px] ${line.gen ? "text-indigo-400/60" : "text-[#55555e]"}`}>
                          {line.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* -- MORE GRID -- */}
        <section className="max-w-[960px] mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
          <Reveal>
            <p className="text-[13px] font-semibold text-indigo-400 mb-4">More</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222228] rounded-xl overflow-hidden border border-[#222228]">
            {GRID_CARDS.map((card, i) => (
              <Reveal key={i} delay={i * 25}>
                <div className="bg-[#141418] p-5 sm:px-[22px] sm:py-6">
                  <p className="text-sm font-semibold mb-1 text-[#e8e6e3]">{card.title}</p>
                  <p className="text-[13px] text-[#55555e] leading-snug">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -- CTA -- */}
        <section className="max-w-[460px] mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-20 sm:pb-[100px] text-center">
          <Reveal>
            <h2 className="text-[22px] sm:text-[28px] font-bold tracking-[-0.025em] mb-2.5">
              Capture once, use everywhere.
            </h2>
            <p className="text-base text-[#8a8a96] mb-6">
              Open source. Free while in beta.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <CopyButton text="npm i -g terso-cli" />
              <a
                href="/docs"
                className="px-5 py-3 rounded-[10px] border border-[#2e2e36] text-[#8a8a96] text-sm font-semibold no-underline min-h-[44px] flex items-center hover:border-[#55555e] hover:text-[#e8e6e3] transition-colors"
              >
                Read the docs
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* -- FOOTER -- */}
      <footer className="px-5 sm:px-6 py-4 border-t border-[#222228]">
        <div className="max-w-[960px] mx-auto flex justify-between items-center flex-wrap gap-2">
          <span className="text-[13px] text-[#55555e]">
            <strong className="text-[#55555e] font-semibold">terso</strong> &middot; MIT
          </span>
          <div className="flex gap-3.5">
            <a
              href="https://github.com/petrkindlmann/terso-cli"
              target="_blank"
              rel="noopener"
              className="text-[#55555e] no-underline text-[13px] py-2 px-1 hover:text-[#8a8a96] transition-colors min-h-[44px] flex items-center"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/terso-cli"
              target="_blank"
              rel="noopener"
              className="text-[#55555e] no-underline text-[13px] py-2 px-1 hover:text-[#8a8a96] transition-colors min-h-[44px] flex items-center"
            >
              npm
            </a>
            <a
              href="/docs"
              className="text-[#55555e] no-underline text-[13px] py-2 px-1 hover:text-[#8a8a96] transition-colors min-h-[44px] flex items-center"
            >
              Docs
            </a>
            <a
              href="https://omnus.dev"
              target="_blank"
              rel="noopener"
              className="text-[#55555e] no-underline text-[13px] py-2 px-1 hover:text-[#8a8a96] transition-colors min-h-[44px] flex items-center"
            >
              Omnus
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
