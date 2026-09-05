import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, GitFork, Calendar } from 'lucide-react';
import { getGitHubReadme, getGitHubStats } from '@/lib/services/github';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

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
          <div className="min-w-0 max-w-none break-words text-sm leading-7 text-muted [&_a]:text-primary-light [&_a]:underline [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:break-words [&_code]:rounded [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-primary-light [&_h1]:mb-5 [&_h1]:mt-0 [&_h1]:border-b-2 [&_h1]:border-border [&_h1]:pb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-tight [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-tight [&_hr]:my-6 [&_hr]:border-border [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_li]:my-1 [&_li]:pl-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_pre]:my-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:border-2 [&_pre]:border-border [&_pre]:bg-background [&_pre]:p-4 [&_pre]:text-xs [&_pre]:leading-5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-bold [&_strong]:text-foreground [&_table]:my-5 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:whitespace-nowrap [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-background [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6">
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
