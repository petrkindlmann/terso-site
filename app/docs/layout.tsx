import type { Metadata } from "next";
import { NavBar } from "@/components/landing/NavBar";
import DocsSidebar from "@/components/DocsSidebar";
import { getNavGroups } from "@/lib/docs";

export const metadata: Metadata = {
  title: {
    template: "%s | Terso Docs",
    default: "Docs | Terso",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groups = getNavGroups();

  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      <NavBar />

      <div className="flex pt-14">
        <DocsSidebar groups={groups} />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-10 lg:py-12 max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}
