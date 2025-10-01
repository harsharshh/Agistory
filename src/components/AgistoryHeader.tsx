"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { useTheme } from "@/components/ThemeProvider";

type AgistoryHeaderProps = {
  logoRefs: MutableRefObject<HTMLSpanElement[]>;
};

const products = [
  {
    name: "StoryPointz",
    description: "AI-guided estimation and planning poker for global teams.",
    href: "https://story-pointz.vercel.app/",
    gradient: "from-[#8b5cf6] via-[#60a5fa] to-[#34d399]",
  },
  {
    name: "SprintPulse",
    description: "Predictive sprint health dashboards with risk alerts.",
    href: "#sprintpulse",
    gradient: "from-[#f97316] via-[#fb7185] to-[#c084fc]",
    comingSoon: true,
  },
  {
    name: "RetroScope",
    description: "Automated retrospectives with action tracking and insights.",
    href: "#retroscope",
    gradient: "from-[#38bdf8] via-[#22d3ee] to-[#9333ea]",
    comingSoon: true,
  },
];

export function AgistoryHeader({ logoRefs }: AgistoryHeaderProps) {
  const { theme, toggleTheme, isReady } = useTheme();
  const isDark = theme === "dark";
  const [isProductsOpen, setProductsOpen] = useState(false);
  const productsButtonRef = useRef<HTMLButtonElement | null>(null);
  const productsPopoverRef = useRef<HTMLDivElement | null>(null);
  const productsPopoverId = useId();
  const punchlineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!isProductsOpen) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        productsPopoverRef.current?.contains(target) ||
        productsButtonRef.current?.contains(target)
      ) {
        return;
      }
      setProductsOpen(false);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isProductsOpen]);

  useEffect(() => {
    if (isProductsOpen) {
      productsPopoverRef.current?.focus();
    }
  }, [isProductsOpen]);

  useEffect(() => {
    if (!logoRefs.current.length) return;
    if (!punchlineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // If user prefers reduced motion, show letters and punchline immediately
      logoRefs.current.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      punchlineRef.current.style.opacity = "1";
      punchlineRef.current.style.transform = "none";
      return;
    }

    logoRefs.current.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-12px)";
      el.animate(
        [
          { opacity: 0, transform: "translateX(-12px)" },
          { opacity: 1, transform: "translateX(0)" },
        ],
        {
          duration: 400,
          easing: "ease-out",
          fill: "forwards",
          delay: i * 80,
        }
      );
    });

    const totalDelay = logoRefs.current.length * 80;
    punchlineRef.current.style.opacity = "0";
    punchlineRef.current.style.transform = "translateX(-12px)";
    punchlineRef.current.animate(
      [
        { opacity: 0, transform: "translateX(-12px)" },
        { opacity: 1, transform: "translateX(0)" },
      ],
      {
        duration: 400,
        easing: "ease-out",
        fill: "forwards",
        delay: totalDelay,
      }
    );
  }, [logoRefs]);

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
              className="inline-block px-[1px] text-[#DC2626] first:text-[#0284C7] last:text-[#F59E0B] dark:text-[#F87171] dark:first:text-[#60A5FA] dark:last:text-[#FCD34D]"
            >
              {letter}
            </span>
          ))}
        </div>
        <span
          ref={punchlineRef}
          style={{ opacity: 0 }}
          className="hidden sm:inline text-sm font-medium uppercase tracking-[0.35em] text-[#0284C7] dark:text-[#FCD34D]"
        >
          Orchestrate Every Sprint
        </span>
      </div>
      <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
        <div className="relative">
          <button
            type="button"
            ref={productsButtonRef}
            onClick={() => setProductsOpen((open) => !open)}
            aria-expanded={isProductsOpen}
            aria-controls={isProductsOpen ? productsPopoverId : undefined}
            className="inline-flex items-center gap-1 hover:text-[#DC2626] dark:hover:text-[#FCD34D] transition-colors"
          >
            Products
            <span
              className={`mt-[2px] inline-block h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-current transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isProductsOpen ? (
            <div
              ref={productsPopoverRef}
              id={productsPopoverId}
              tabIndex={-1}
              role="dialog"
              aria-label="Agistory products"
              className="absolute left-0 z-30 mt-3 w-72 rounded-2xl border border-[#0284C7]/20 bg-[var(--background)]/95 p-3 shadow-lg backdrop-blur-md transition-colors dark:border-white/10"
            >
              <div className="grid gap-2">
                {products.map((product) => (
                  <a
                    key={product.name}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 rounded-xl border border-transparent bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-800/70"
                    onClick={() => setProductsOpen(false)}
                  >
                    <div className="flex items-center">
                      <span
                        className={`bg-gradient-to-r ${product.gradient} bg-clip-text text-base font-semibold text-transparent`}
                      >
                        {product.name}
                      </span>
                      {product.comingSoon && (
                        <span className="ml-2 rounded-full bg-[#fcd34d]/20 text-[#b45309] text-[10px] font-semibold px-2 py-0.5">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {product.description}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <a
          href="#about"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#DC2626] dark:hover:text-[#FCD34D] transition-colors"
        >
          About
        </a>
        <a
          href="#contact"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#DC2626] dark:hover:text-[#FCD34D] transition-colors"
        >
          contact
        </a>
      </nav>
      <div className="flex items-center gap-3">
      <button
            type="button"
            onClick={toggleTheme}
            suppressHydrationWarning
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0284C7]/30 bg-white/80 text-[#0284C7] shadow-sm transition-colors hover:border-[#0284C7]/60 hover:text-[#DC2626] dark:border-white/20 dark:bg-[#1f2937] dark:text-[#FCD34D] dark:hover:text-[#F59E0B]"
            aria-label={isReady ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
          >
          {isReady ? (
            isDark ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )
          ) : (
            <span className="h-4 w-4 rounded-full bg-current" />
          )}
        </button>
        <a
          href="#early-access"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-full bg-[#DC2626] text-[#F9FAFB] text-sm font-semibold shadow-sm transition-colors hover:bg-[#b91c1c] dark:bg-[#F87171] dark:text-[#1E293B] dark:hover:bg-[#fca5a5]"
        >
          Explore the Suite
        </a>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M5.22 5.22l1.42 1.42" />
      <path d="M17.36 17.36l1.42 1.42" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M5.22 18.78l1.42-1.42" />
      <path d="M17.36 6.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
            <path d="M21 12.8A9.2 9.2 0 1 1 11.2 3 7.6 7.6 0 0 0 21 12.8z" />
    </svg>
  );
}
