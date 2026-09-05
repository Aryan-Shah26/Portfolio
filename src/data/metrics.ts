import type { MetricCardData, GitHubStats } from '@/lib/types';

/**
 * Engineering metrics for the overview page.
 * Projects/GitHub Activity are derived from live GitHub stats (pass in from getGitHubStats());
 * Coding/Tech Stack are static facts that don't change with repo data.
 */
export async function getEngineeringMetrics(githubStats?: GitHubStats): Promise<MetricCardData[]> {
  const totalRepos = githubStats?.totalRepos ?? 0;
  const totalContributions = githubStats?.totalContributions ?? 0;

  const metrics: MetricCardData[] = [
    {
      title: 'Projects',
      value: totalRepos,
      subtitle: 'Public repositories',
      icon: 'FolderGit2',
    },
    {
      title: 'GitHub Activity',
      value: totalContributions.toLocaleString(),
      subtitle: 'Contributions · Last 12 months',
      icon: 'GitCommitHorizontal',
    },
    {
      title: 'Codeforces',
      value: '1754',
      subtitle: 'Expert · aryan_shah26',
      icon: 'Code2',
    },
    {
      title: 'Tech Stack',
      value: '15+',
      subtitle: 'Languages & frameworks',
      icon: 'Layers',
    },
  ];

  return metrics;
}
