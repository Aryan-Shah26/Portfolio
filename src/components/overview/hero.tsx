'use client';

import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 22.222 0h.003z" />
    </svg>
  );
}

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

      <div className="flex flex-wrap gap-2" aria-label="Social profiles">
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-foreground"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={SITE_CONFIG.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-foreground"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={SITE_CONFIG.codeforces}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-foreground"
        >
          <Code2 className="h-4 w-4" />
          Codeforces
        </a>
      </div>
    </section>
  );
}
