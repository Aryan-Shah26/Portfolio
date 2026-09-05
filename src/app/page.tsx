import Hero from '@/components/overview/hero';
import MetricCard from '@/components/overview/metric-card';
import ContributionHeatmap from '@/components/overview/contribution-heatmap';
import FeaturedProjects from '@/components/overview/featured-projects';
import { getEngineeringMetrics } from '@/data/metrics';
import { getGitHubStats } from '@/lib/services/github';
import type { Project } from '@/lib/types';

export default async function HomePage() {
  const githubStats = await getGitHubStats();
  const metrics = await getEngineeringMetrics(githubStats);

  // Map top repos to Project-like objects for the featured projects component
  const featuredProjects: Project[] = githubStats.topRepos.slice(0, 4).map((repo) => ({
    slug: repo.name,
    name: repo.name,
    description: repo.description || '',
    category: 'ai-ml' as const,
    tags: [repo.language].filter(Boolean),
    stars: repo.stars,
    forks: repo.forks,
    githubUrl: repo.url,
    lastUpdated: repo.updatedAt,
  }));

  return (
    <div className="space-y-8">
      <Hero />
      
      {/* Metrics Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.title} {...metric} index={index} />
          ))}
        </div>
      </section>

      {/* Contribution Heatmap */}
      <section>
        <ContributionHeatmap
          contributionData={githubStats.contributionData}
          totalContributions={githubStats.totalContributions}
        />
      </section>

      {/* Featured Projects */}
      <section>
        <FeaturedProjects projects={featuredProjects} />
      </section>
    </div>
  );
}
