'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { GitHubStats } from '@/lib/types';

export default function AnalyticsPage() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github-stats')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub stats request failed');
        return res.json();
      })
      .then((data) => {
        setGithubStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch GitHub stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8 pb-10">
        <header>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted">Engineering activity and project insights</p>
        </header>
        <div className="glass-card p-12 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!githubStats) {
    return (
      <div className="flex flex-col gap-8 pb-10">
        <header>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted">Engineering activity and project insights</p>
        </header>
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground">Unable to load analytics data. Please check your GitHub configuration.</p>
        </div>
      </div>
    );
  }

  const topRepos = githubStats.topRepos || [];
  const totalProjects = topRepos.length;

  // Derive tech usage from repo languages
  const techUsage: Record<string, number> = {};
  topRepos.forEach((repo) => {
    if (repo.language) {
      techUsage[repo.language] = (techUsage[repo.language] || 0) + 1;
    }
  });

  const sortedTech = Object.entries(techUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  const maxTechCount = sortedTech.length ? sortedTech[0][1] : 1;

  const getTechColor = (tech: string) => {
    const t = tech.toLowerCase();
    if (['python', 'typescript', 'javascript', 'rust', 'go'].includes(t)) return 'bg-blue-500';
    if (['react', 'next.js', 'vue', 'svelte'].includes(t)) return 'bg-purple-500';
    if (['docker', 'aws', 'kubernetes', 'git'].includes(t)) return 'bg-cyan-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted">Engineering activity and project insights</p>
      </header>

      <section className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">GitHub Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">{githubStats.totalRepos}</span>
            <span className="text-xs text-muted-foreground">Total Repos</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">{githubStats.totalContributions}</span>
            <span className="text-xs text-muted-foreground">Contributions</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">{githubStats.totalStars}</span>
            <span className="text-xs text-muted-foreground">Stars</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Top Languages</h3>
          <div className="flex flex-col gap-2">
            {githubStats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <span className="text-sm w-24 truncate">{lang.name}</span>
                <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color || '#ccc',
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Top Repositories</h3>
          <div className="flex flex-col gap-3">
            {githubStats.topRepos.map((repo) => (
              <div key={repo.name} className="flex flex-col gap-1 p-3 rounded bg-card/50 border-2 border-white/5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{repo.name}</span>
                  <span className="text-xs text-muted-foreground">★ {repo.stars}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{repo.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6e7681' }} />
                    <span className="text-xs text-muted-foreground">{repo.language}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">· Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Project Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-none bg-card/50 border-2 border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-foreground">{totalProjects}</span>
            <span className="text-xs text-muted-foreground mt-1">Total Projects</span>
          </div>
          <div className="p-4 rounded-none bg-card/50 border-2 border-white/5 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-foreground">{githubStats.totalStars}</span>
            <span className="text-xs text-muted-foreground mt-1">Total Stars</span>
          </div>
        </div>
      </section>

      {sortedTech.length > 0 && (
        <section className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Technology Usage</h2>
          <div className="flex flex-col gap-3">
            {sortedTech.map(([tech, count]) => (
              <div key={tech} className="flex items-center gap-3">
                <span className="text-sm w-32 truncate">{tech}</span>
                <div className="flex-1 h-3 bg-card rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full opacity-80", getTechColor(tech))}
                    style={{ width: `${(count / maxTechCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs px-2 py-0.5 rounded-none bg-card text-muted-foreground w-8 text-center">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
