'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="flex flex-col gap-6 py-12 lg:py-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground">
          Hi, I&apos;m Aryan 👋
        </h1>
        <h2 className="text-xl text-muted">
          I build AI systems and turn data into impact.
        </h2>
        <p className="text-muted-foreground mt-4 max-w-[600px]">
          Explore my projects, experiments, technical work, and engineering journey through data.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <Link 
          href="/projects" 
          className="bg-primary hover:bg-primary/90 text-white rounded-none px-6 py-3 transition-colors"
        >
          Explore Projects →
        </Link>
        <Link 
          href="/resume" 
          className="border-2 border-border hover:border-foreground text-muted hover:text-foreground rounded-none px-6 py-3 transition-colors"
        >
          View Resume
        </Link>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
        <span className="text-xs text-muted-foreground">Live data</span>
      </div>
    </section>
  );
}
