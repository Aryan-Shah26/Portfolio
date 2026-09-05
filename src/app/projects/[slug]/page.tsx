import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, GitFork, Calendar } from 'lucide-react';
import { getGitHubReadme, getGitHubStats } from '@/lib/services/github';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  const readme = await getGitHubReadme(repo.name);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
            <h1 className="break-words text-2xl font-bold text-foreground sm:text-3xl">{repo.name}</h1>
        </div>
        
        <p className="text-lg text-muted mb-6">{repo.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {repo.language && (
            <span className="text-sm px-3 py-1 rounded-none bg-primary/10 text-primary-light">
              {repo.language}
            </span>
          )}
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-border pb-8 text-sm text-muted-foreground sm:gap-6">
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

      {readme && (
        <article className="glass-card min-w-0 overflow-hidden p-4 sm:p-8">
          <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground prose-a:text-primary-light prose-code:break-words prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:bg-card prose-pre:border-2 prose-pre:border-white/5 prose-table:block prose-table:max-w-full prose-table:overflow-x-auto prose-table:whitespace-nowrap">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => {
                  void node;
                  return <a {...props} target="_blank" rel="noreferrer" />;
                },
                img: ({ node, ...props }) => {
                  void node;
                  return <img {...props} className="h-auto max-w-full" alt={props.alt || ''} />;
                },
              }}
            >
              {readme}
            </ReactMarkdown>
          </div>
        </article>
      )}
    </div>
  );
}
