"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap } from "@/lib/gsap";
import { AgistoryHeader } from "@/components/AgistoryHeader";

export default function Home() {
  const logoRefs = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const gsap = getGsap();
    const logoElements = logoRefs.current.filter(Boolean);
    if (logoElements.length) {
      gsap.fromTo(
        logoElements,
        { yPercent: 120, opacity: 0, rotateX: -45 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.06,
        }
      );
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
    if (subRef.current) {
      gsap.fromTo(
        subRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.35 }
      );
    }
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3,
          stagger: 0.08,
        }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111827] flex flex-col">
      <AgistoryHeader logoRefs={logoRefs} />
      <section className="flex-1 flex items-center justify-center px-6 sm:px-20 pb-12">
        <div className="max-w-2xl text-center sm:text-left">
          <h1 ref={titleRef} className="text-4xl sm:text-6xl font-semibold tracking-tight">
            Powering the Agistory Agile Suite
          </h1>
          <p ref={subRef} className="mt-4 text-base sm:text-lg text-[#111827]/80">
            Agistory unites planning, sprint execution, and retros into one open platform so every product team ships with clarity and momentum.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#suite"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#DC2626] text-[#F9FAFB] text-sm font-medium shadow-sm hover:bg-[#b91c1c] transition-colors"
            >
              Explore the Suite
            </a>
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#0284C7]/40 text-[#0284C7] text-sm font-medium hover:bg-[#0284C7] hover:text-white transition-colors"
            >
              View Roadmap
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
