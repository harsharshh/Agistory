"use client";

import type { MutableRefObject } from "react";

type AgistoryHeaderProps = {
  logoRefs: MutableRefObject<HTMLSpanElement[]>;
};

export function AgistoryHeader({ logoRefs }: AgistoryHeaderProps) {
  return (
    <header className="px-6 sm:px-16 py-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex text-2xl sm:text-3xl font-semibold tracking-tight leading-none">
          {"Agistory".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              ref={(el) => {
                if (el) {
                  logoRefs.current[index] = el;
                }
              }}
              className="inline-block px-[1px] text-[#DC2626] first:text-[#0284C7] last:text-[#F59E0B]"
            >
              {letter}
            </span>
          ))}
        </div>
        <span className="hidden sm:inline text-sm font-medium uppercase tracking-[0.35em] text-[#0284C7]">
          Orchestrate Every Sprint
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
        <a href="#products" className="hover:text-[#DC2626] transition-colors">
          Products
        </a>
        <a href="#community" className="hover:text-[#DC2626] transition-colors">
          Community
        </a>
        <a href="#docs" className="hover:text-[#DC2626] transition-colors">
          Docs
        </a>
      </div>
      <a
        href="#early-access"
        className="hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-full bg-[#DC2626] text-[#F9FAFB] text-sm font-semibold shadow-sm hover:bg-[#b91c1c] transition-colors"
      >
        Early Access
      </a>
    </header>
  );
}

