import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "@/components/Markdown";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

const includeDrafts =
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1" ||
  process.env.NODE_ENV === "development";

export async function generateStaticParams() {
  return getPostSlugs({ includeDrafts: true }).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — Terso`,
    description: post.meta.title,
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  if (post.meta.status === "draft" && !includeDrafts) notFound();

  const all = getAllPosts({ includeDrafts });
  const idx = all.findIndex((p) => p.meta.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  const referencesBlock =
    post.meta.references.length > 0
      ? `\n\n---\n\n## References\n\n${post.meta.references
          .map((r) => `- <${r}>`)
          .join("\n")}\n`
      : "";

  const noteBlock = post.meta.note
    ? `> **Note:** ${post.meta.note}\n\n`
    : "";

  const fullContent = `${noteBlock}${post.content}${referencesBlock}`;

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
        <p className="text-[13px] text-[#55555e] font-mono tabular-nums mb-2">
          <Link href="/blog" className="text-[#55555e] hover:text-indigo-400 no-underline">
            ← all posts
          </Link>
          <span className="mx-2">·</span>
          <time>{formatDate(post.meta.date)}</time>
          {post.meta.status === "draft" && (
            <span className="ml-3 text-indigo-400 font-semibold tracking-wider">
              DRAFT
            </span>
          )}
        </p>
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.025em] leading-[1.18] mb-6">
          {post.meta.title}
        </h1>

        <article>
          <Markdown content={fullContent} />
        </article>

        <div className="mt-16 pt-8 border-t border-[#27272A] flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.meta.slug}`}
              className="group text-left no-underline max-w-[48%]"
            >
              <span className="text-[11px] font-medium text-[#52525B] uppercase tracking-wider font-mono">
                Previous
              </span>
              <span className="block text-sm font-medium text-[#A1A1AA] group-hover:text-[#6366F1] mt-1">
                ← {prev.meta.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.meta.slug}`}
              className="group text-right no-underline max-w-[48%]"
            >
              <span className="text-[11px] font-medium text-[#52525B] uppercase tracking-wider font-mono">
                Next
              </span>
              <span className="block text-sm font-medium text-[#A1A1AA] group-hover:text-[#6366F1] mt-1">
                {next.meta.title} →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
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
