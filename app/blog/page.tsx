import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Terso",
  description:
    "Posts about terso, AGENTS.md, and the AI-coding-agent ecosystem.",
};

const includeDrafts =
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1" ||
  process.env.NODE_ENV === "development";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts({ includeDrafts });

  return (
    <div className="min-h-screen bg-[#0c0c0f] text-[#e8e6e3]">
      <header className="border-b border-[#222228]">
        <div className="max-w-[720px] mx-auto px-5 sm:px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#e8e6e3] no-underline">
            terso
          </Link>
          <nav className="flex gap-4 text-[13px] text-[#8a8a96]">
            <Link href="/" className="hover:text-[#e8e6e3] no-underline">
              home
            </Link>
            <Link href="/docs/getting-started" className="hover:text-[#e8e6e3] no-underline">
              docs
            </Link>
            <Link href="/blog" className="text-[#e8e6e3] no-underline">
              blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-5 sm:px-6 pt-12 pb-24">
        <p className="text-[13px] font-semibold text-indigo-400 mb-2">Blog</p>
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] mb-2">
          AGENTS.md, agent coordination, and the work in between.
        </h1>
        <p className="text-base text-[#8a8a96] leading-relaxed mb-10">
          Notes from shipping terso and watching the AI-coding-agent
          ecosystem in 2026.
        </p>

        {posts.length === 0 ? (
          <p className="text-[#8a8a96]">
            Posts go live at launch. Set <code className="bg-[#1a1a1f] px-1.5 py-px rounded text-[0.88em] font-mono">NEXT_PUBLIC_SHOW_DRAFTS=1</code> to preview drafts.
          </p>
        ) : (
          <ul className="list-none p-0 m-0">
            {posts.map((post) => (
              <li
                key={post.meta.slug}
                className="py-5 border-b border-[#222228] last:border-b-0"
              >
                <time className="text-[12px] text-[#55555e] font-mono tabular-nums">
                  {formatDate(post.meta.date)}
                  {post.meta.status === "draft" && (
                    <span className="ml-3 text-indigo-400 font-semibold tracking-wider">
                      DRAFT
                    </span>
                  )}
                </time>
                <h2 className="text-[19px] font-semibold mt-1.5 mb-1.5 leading-snug">
                  <Link
                    href={`/blog/${post.meta.slug}`}
                    className="text-[#e8e6e3] hover:text-indigo-400 no-underline"
                  >
                    {post.meta.title}
                  </Link>
                </h2>
                {post.meta.tags.length > 0 && (
                  <p className="text-[12px] text-[#55555e] font-mono mt-0">
                    {post.meta.tags.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="border-t border-[#222228] px-5 sm:px-6 py-4">
        <div className="max-w-[720px] mx-auto flex justify-between items-center flex-wrap gap-2">
          <span className="text-[13px] text-[#55555e]">
            <strong className="text-[#55555e] font-semibold">terso</strong> · MIT
          </span>
          <div className="flex gap-3.5 text-[13px]">
            <a
              href="https://github.com/petrkindlmann/terso-cli"
              target="_blank"
              rel="noopener"
              className="text-[#55555e] hover:text-[#8a8a96] no-underline"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/terso-cli"
              target="_blank"
              rel="noopener"
              className="text-[#55555e] hover:text-[#8a8a96] no-underline"
            >
              npm
            </a>
            <a
              href="https://omnus.dev"
              target="_blank"
              rel="noopener"
              className="text-[#55555e] hover:text-[#8a8a96] no-underline"
            >
              Omnus
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
