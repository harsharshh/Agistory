export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 sm:p-20">
      <div className="max-w-2xl text-center sm:text-left">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          Agistory
        </h1>
        <p className="mt-4 text-base sm:text-lg text-foreground/80">
          Open source farm data and analysis platform.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-black/10 dark:border-white/20 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
