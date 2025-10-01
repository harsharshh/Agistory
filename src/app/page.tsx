"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { getGsap } from "@/lib/gsap";
import { AgistoryHeader } from "@/components/AgistoryHeader";
import { products } from "@/data/products";

const aboutHighlights = [
  {
    title: "Open data foundation",
    body: "We keep your data portable with an open, auditable schema so your sprint history is always yours.",
  },
  {
    title: "AI that stays collaborative",
    body: "Machine intelligence augments decisions while keeping humans in the loop for every key call.",
  },
  {
    title: "Connected rituals",
    body: "Estimation, sprint execution, and retrospectives sync automatically—no more duplicate updates.",
  },
  {
    title: "Enterprise ready",
    body: "SOC2-ready infrastructure, SSO, and role-based controls keep security teams and admins happy.",
  },
];

export default function Home() {
  const logoRefs = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable browser scroll restoration so reloads start at hero
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // If there's no hash in the URL, jump to top (hero)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    // Cleanup: restore default behavior when navigating away
    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

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
    // Theme-aware node glow + pulse (lightweight) + randomized node colors from brand palette
    if (heroSvgRef.current) {
      const gsap = getGsap();
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes = heroSvgRef.current.querySelectorAll<SVGCircleElement>(".node");
      if (nodes.length) {
        // Determine theme
        const isDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        // Brand-aligned palettes for light/dark
        const palette = isDark
          ? ["#F87171", "#60A5FA", "#FCD34D", "#A78BFA", "#34D399"]
          : ["#DC2626", "#0284C7", "#F59E0B", "#8B5CF6", "#10B981"];
        // Assign random color per node and sync drop-shadow glow
        nodes.forEach((n, i) => {
          const color = palette[i % palette.length];
          n.setAttribute("fill", color);
          (n as SVGElement).setAttribute(
            "style",
            `filter: drop-shadow(0 0 6px ${color});`
          );
        });
        // Animate pulse unless user prefers reduced motion
        if (!prefersReduced) {
          gsap.fromTo(
            nodes,
            { opacity: 0.65 },
            {
              opacity: 1,
              yoyo: true,
              repeat: -1,
              duration: 2.2,
              ease: "sine.inOut",
              stagger: 0.2,
            }
          );
        } else {
          nodes.forEach((n) => ((n as SVGElement).style.opacity = "0.9"));
        }
      }
    }
    // Orbiting Agile Nodes background animation
    if (heroSvgRef.current) {
      const gsap = getGsap();
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReduced) {
        const svgOrigin = "200 200"; // center of the 0 0 400 400 viewBox

        gsap.to(".orbit1", {
          rotation: 360,
          svgOrigin,
          transformBox: "fill-box",
          ease: "none",
          repeat: -1,
          duration: 18,
        });
        gsap.to(".orbit2", {
          rotation: -360,
          svgOrigin,
          transformBox: "fill-box",
          ease: "none",
          repeat: -1,
          duration: 26,
        });
        gsap.to(".orbit3", {
          rotation: 360,
          svgOrigin,
          transformBox: "fill-box",
          ease: "none",
          repeat: -1,
          duration: 34,
        });

        // Subtle breathing scale for the whole SVG
        gsap.to(heroSvgRef.current, {
          scale: 1.015,
          transformOrigin: "center",
          yoyo: true,
          repeat: -1,
          duration: 6,
          ease: "sine.inOut",
        });
      } else {
        // Ensure visible if motion reduced
        heroSvgRef.current.style.opacity = "0.35";
      }
    }
  }, []);

  return (
    <main className="relative flex flex-col text-[var(--foreground)] transition-colors duration-300">
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/85 backdrop-blur-lg">
        <AgistoryHeader logoRefs={logoRefs} />
      </div>
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-20 pt-40 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <svg
            ref={heroSvgRef}
            viewBox="0 0 400 400"
            className="h-[70vmin] w-[70vmin] opacity-35"
            aria-hidden="true"
          >
            {/* Static orbits */}
            <circle
              cx="200"
              cy="200"
              r="95"
              stroke="#0284C7"
              strokeOpacity=".25"
              strokeWidth="1.25"
              fill="none"
              className="dark:stroke-[#60A5FA]"
            />
            <circle
              cx="200"
              cy="200"
              r="145"
              stroke="#DC2626"
              strokeOpacity=".22"
              strokeWidth="1.25"
              fill="none"
              className="dark:stroke-[#F87171]"
            />
            <circle
              cx="200"
              cy="200"
              r="190"
              stroke="#F59E0B"
              strokeOpacity=".18"
              strokeWidth="1.25"
              fill="none"
              className="dark:stroke-[#FCD34D]"
            />
            {/* Orbiting nodes (groups rotate around center) */}
            <g className="orbit1">
              <circle className="node" cx="295" cy="200" r="4" fill="var(--foreground)" style={{ filter: "drop-shadow(0 0 6px var(--foreground))" }} />
              <circle className="node" cx="105" cy="200" r="3" fill="var(--foreground)" opacity=".7" style={{ filter: "drop-shadow(0 0 5px var(--foreground))" }} />
            </g>
            <g className="orbit2">
              <circle className="node" cx="345" cy="200" r="4" fill="var(--foreground)" style={{ filter: "drop-shadow(0 0 6px var(--foreground))" }} />
              <circle className="node" cx="55" cy="200" r="3" fill="var(--foreground)" opacity=".7" style={{ filter: "drop-shadow(0 0 5px var(--foreground))" }} />
              <circle className="node" cx="200" cy="345" r="3" fill="var(--foreground)" opacity=".55" style={{ filter: "drop-shadow(0 0 4px var(--foreground))" }} />
            </g>
            <g className="orbit3">
              <circle className="node" cx="390" cy="200" r="3.5" fill="var(--foreground)" style={{ filter: "drop-shadow(0 0 5px var(--foreground))" }} />
              <circle className="node" cx="200" cy="10" r="3" fill="var(--foreground)" opacity=".6" style={{ filter: "drop-shadow(0 0 4px var(--foreground))" }} />
              <circle className="node" cx="200" cy="390" r="2.5" fill="var(--foreground)" opacity=".5" style={{ filter: "drop-shadow(0 0 3px var(--foreground))" }} />
            </g>
          </svg>
        </div>
        <div className="max-w-4xl text-center mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Powering the Agistory Agile Suite
          </h1>
          <p
            ref={subRef}
            className="mt-4 text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto"
          >
            Agistory unites planning, sprint execution, and retros into one open platform so every product team ships with clarity and momentum.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#DC2626] text-[#F9FAFB] text-sm font-medium shadow-sm transition-colors hover:bg-[#b91c1c] dark:bg-[#F87171] dark:text-[#1E293B] dark:hover:bg-[#fca5a5]"
            >
              Explore Products
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-[#0284C7]/40 text-[#0284C7] text-sm font-medium transition-colors hover:bg-[#0284C7] hover:text-white dark:border-white/20 dark:text-[#FCD34D] dark:hover:bg-white/10 dark:hover:text-[#F9FAFB]"
            >
              Why Agistory
            </a>
          </div>
        </div>
      </section>
      <section
        id="products"
        className="min-h-screen px-6 sm:px-20 pt-40 pb-24 flex items-center"
      >
        <div className="mx-auto max-w-6xl w-full rounded-3xl border border-white/40 bg-white/75 p-10 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/65">
          <div className="flex flex-col gap-4 text-center sm:text-left sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
                Explore the Agistory product family
              </h2>
              <p className="mt-3 text-base text-[var(--muted-foreground)]">
                Purpose-built tools that keep agile teams aligned from estimation to retros.
              </p>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              Click a card to open the live app or join the waitlist.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const isLive = product.status === "live" && product.url;
              return (
                <article
                  key={product.id}
                  id={product.id}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#0284C7]/15 bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60"
                  role={isLive ? "link" : undefined}
                  tabIndex={isLive ? 0 : undefined}
                  onClick={() => {
                    if (isLive && product.url) {
                      window.open(product.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  onKeyDown={(event) => {
                    if (!isLive || !product.url) {
                      return;
                    }
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      window.open(product.url, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${product.gradient} opacity-25 blur-2xl`}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <span
                    className={`bg-gradient-to-r ${product.gradient} bg-clip-text text-2xl font-semibold text-transparent`}
                  >
                    {product.name}
                  </span>
                  <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                    {product.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center rounded-full border border-[#0284C7]/30 px-3 py-1 text-xs font-medium text-[#0284C7] dark:border-white/20 dark:text-[#FCD34D]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    {isLive && product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[#DC2626] px-4 py-2 text-sm font-semibold text-[#F9FAFB] shadow-sm transition-colors hover:bg-[#b91c1c] dark:bg-[#F87171] dark:text-[#1E293B] dark:hover:bg-[#fca5a5]"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Launch App
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center justify-center rounded-full border border-[#0284C7]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0284C7] opacity-80 dark:border-white/20 dark:text-[#FCD34D]"
                        aria-disabled="true"
                      >
                        Coming Soon
                      </span>
                    )}
                    <a
                      href="#contact"
                      className="text-xs font-semibold text-[#0284C7] underline-offset-4 transition hover:underline dark:text-[#FCD34D]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Partner with us
                    </a>
                  </div>
                </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="about"
        className="min-h-screen px-6 sm:px-20 pt-40 pb-24 flex items-center"
      >
        <div className="mx-auto max-w-5xl w-full rounded-3xl border border-white/40 bg-white/75 p-10 text-[#0f172a] shadow-lg backdrop-blur-sm dark:border-white/15 dark:bg-slate-900/65 dark:text-[#F9FAFB]">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Why teams choose Agistory
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-200/80">
            We build open, interoperable tooling that keeps Agile rituals connected without forcing teams into rigid workflows. With Agistory, leaders finally see one connected picture from product bets to sprint delivery.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {aboutHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-[#0284C7]/15 bg-[#dc2626]/5 p-6 transition hover:border-[#0284C7]/40 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <h3 className="text-lg font-semibold text-[#DC2626] dark:text-[#F87171]">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-200/80">
                  {highlight.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="min-h-screen px-6 sm:px-20 pt-40 pb-24 flex items-center"
      >
        <div className="mx-auto max-w-4xl w-full rounded-3xl border border-white/40 bg-white/80 p-10 shadow-xl backdrop-blur-sm dark:border-white/15 dark:bg-slate-900/70">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
            Let’s build your agile future
          </h2>
          <p className="mt-4 text-base text-[var(--muted-foreground)]">
            Need a custom workflow, integrations, or an enterprise rollout? Drop us a note and we’ll set up a working session within 48 hours.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:harsh13596@gmail.com"
              className="inline-flex items-center justify-center rounded-full bg-[#DC2626] px-6 py-3 text-sm font-semibold text-[#F9FAFB] shadow-sm transition-colors hover:bg-[#b91c1c] dark:bg-[#F87171] dark:text-[#1E293B] dark:hover:bg-[#fca5a5]"
            >
              Email us
            </a>
            <a
              href="https://cal.com/harsh-singh-modkzm/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#0284C7]/40 px-6 py-3 text-sm font-semibold text-[#0284C7] transition-colors hover:bg-[#0284C7] hover:text-white dark:border-white/20 dark:text-[#FCD34D] dark:hover:bg-white/10 dark:hover:text-[#F9FAFB]"
            >
              Book a strategy call
            </a>
          </div>
        </div>
      </section>
      <footer className="px-6 sm:px-20 py-8 border-t border-black/5 bg-white/70 text-[#0f172a] transition-colors dark:border-white/10 dark:bg-slate-900/60 dark:text-[#F9FAFB]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xl font-semibold tracking-tight">
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "var(--logo-gradient)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              Agistory
            </span>
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300/80">
            © {new Date().getFullYear()} Agistory. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
