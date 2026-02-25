"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Returns the sequence of page numbers (and "…" gaps) to display. */
function pageSequence(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);

  return pages;
}

/** Build a URL for a given page, preserving any extra params (e.g. type filter). */
function buildHref(basePath: string, page: number, extra: Record<string, string>): string {
  const params = new URLSearchParams(extra);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  extraParams = {},
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  extraParams?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const prev = currentPage > 1 ? buildHref(basePath, currentPage - 1, extraParams) : null;
  const next = currentPage < totalPages ? buildHref(basePath, currentPage + 1, extraParams) : null;

  const btn =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors";

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
      {/* ── Mobile: Prev / X of Y / Next ── */}
      <div className="flex sm:hidden items-center justify-between w-full">
        {prev ? (
          <Link href={prev} className={`${btn} gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100`}>
            <ChevronLeft size={16} />
            Prev
          </Link>
        ) : (
          <span className={`${btn} gap-1 px-3 py-2 text-gray-300 cursor-not-allowed`}>
            <ChevronLeft size={16} />
            Prev
          </span>
        )}

        <span className="text-sm text-gray-500">
          {currentPage} / {totalPages}
        </span>

        {next ? (
          <Link href={next} className={`${btn} gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100`}>
            Next
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span className={`${btn} gap-1 px-3 py-2 text-gray-300 cursor-not-allowed`}>
            Next
            <ChevronRight size={16} />
          </span>
        )}
      </div>

      {/* ── Desktop: numbered list ── */}
      <div className="hidden sm:flex items-center gap-1">
        {prev ? (
          <Link href={prev} className={`${btn} w-9 h-9 text-gray-600 hover:bg-gray-100`}>
            <ChevronLeft size={16} />
          </Link>
        ) : (
          <span className={`${btn} w-9 h-9 text-gray-300 cursor-not-allowed`}>
            <ChevronLeft size={16} />
          </span>
        )}

        {pageSequence(currentPage, totalPages).map((p, i) =>
          p === "…" ? (
            <span
              key={`gap-${i}`}
              className="w-9 h-9 flex items-center justify-center text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(basePath, p, extraParams)}
              className={`${btn} w-9 h-9 ${
                p === currentPage ? "bg-[#c44944] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </Link>
          ),
        )}

        {next ? (
          <Link href={next} className={`${btn} w-9 h-9 text-gray-600 hover:bg-gray-100`}>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span className={`${btn} w-9 h-9 text-gray-300 cursor-not-allowed`}>
            <ChevronRight size={16} />
          </span>
        )}
      </div>
    </div>
  );
}
