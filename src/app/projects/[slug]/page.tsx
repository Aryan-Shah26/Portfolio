import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, GitFork, Calendar } from 'lucide-react';
import { getGitHubStats } from '@/lib/services/github';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const stats = await getGitHubStats();
  return stats.topRepos.map((repo) => ({ slug: repo.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stats = await getGitHubStats();
  const repo = stats.topRepos.find((r) => r.name === slug);
  if (!repo) return { title: 'Project Not Found' };
  
  return {
    title: `${repo.name} | Engineering Observatory`,
    description: repo.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stats = await getGitHubStats();
  const repo = stats.topRepos.find((r) => r.name === slug);

  if (!repo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-foreground">{repo.name}</h1>
        </div>
        
        <p className="text-lg text-muted mb-6">{repo.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {repo.language && (
            <span className="text-sm px-3 py-1 rounded-none bg-primary/10 text-primary-light">
              {repo.language}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            {repo.stars} stars
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4" />
            {repo.forks} forks
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last updated: {new Date(repo.updatedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-card border-2 border-border text-foreground rounded-none hover:border-border-hover transition-colors text-sm font-medium"
          >
            View Source on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
