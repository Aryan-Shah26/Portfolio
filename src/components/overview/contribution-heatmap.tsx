'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { GitHubContribution } from '@/lib/types';

interface ContributionHeatmapProps {
  contributionData: GitHubContribution[];
  totalContributions: number;
}

export default function ContributionHeatmap({ contributionData, totalContributions }: ContributionHeatmapProps) {
  const weeks = 53;

  const heatmapData = useMemo(() => {
    // If we have real contribution data from GitHub, use it
    if (contributionData && contributionData.length > 0) {
      // Group contributions into weeks (7 days each)
      const data: { date: string; count: number }[][] = [];
      for (let i = 0; i < contributionData.length; i += 7) {
        const week = contributionData.slice(i, i + 7).map((d) => ({
          date: d.date,
          count: d.count,
        }));
        data.push(week);
      }
      // Pad to 53 weeks if needed
      while (data.length < weeks) {
        data.unshift([
          { date: '', count: 0 },
          { date: '', count: 0 },
          { date: '', count: 0 },
          { date: '', count: 0 },
          { date: '', count: 0 },
          { date: '', count: 0 },
          { date: '', count: 0 },
        ]);
      }
      return { data: data.slice(-weeks), total: totalContributions };
    }

    // Keep unavailable GitHub activity visibly empty rather than inventing data.
    const data = Array.from({ length: weeks }, () =>
      Array.from({ length: 7 }, () => ({ date: '', count: 0 }))
    );
    return { data, total: totalContributions };
  }, [contributionData, totalContributions]);

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-card/50 border-2 border-border/50';
    if (count <= 3) return 'bg-primary/20';
    if (count <= 6) return 'bg-primary/40';
    if (count <= 9) return 'bg-primary/60';
    return 'bg-primary';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="glass-card p-6 rounded-none flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Contribution Heatmap</h2>
          <p className="text-sm text-muted-foreground">GitHub activity in the last year</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{heatmapData.total}</span> contributions
        </div>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-1 min-w-max">
          <div className="flex flex-col gap-1 pr-2 pt-[18px] text-[10px] text-muted-foreground h-full justify-between">
            <span className="h-3 leading-3"></span>
            <span className="h-3 leading-3">Mon</span>
            <span className="h-3 leading-3"></span>
            <span className="h-3 leading-3">Wed</span>
            <span className="h-3 leading-3"></span>
            <span className="h-3 leading-3">Fri</span>
            <span className="h-3 leading-3"></span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex text-[10px] text-muted-foreground h-3.5 mb-1 relative">
              {months.map((month, i) => (
                <span key={i} style={{ position: 'absolute', left: `${(i * 100) / 12}%` }}>
                  {month}
                </span>
              ))}
            </div>
            
            <div className="flex gap-1">
              {heatmapData.data.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      role="img"
                      className={cn("w-3 h-3 rounded-sm transition-colors", getColorClass(day.count))}
                      aria-label={day.date ? `${day.count} contributions on ${day.date}` : 'No GitHub activity data'}
                      title={day.date ? `${day.count} contributions on ${day.date}` : 'No GitHub activity data'}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 justify-end text-xs text-muted-foreground mt-2">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-card border-2 border-border/50"></div>
          <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
          <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
          <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
          <div className="w-3 h-3 rounded-sm bg-primary"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
