import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/services/blog';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6 pb-10 max-w-3xl mx-auto">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 w-fit mb-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to blog
      </Link>

      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs px-2.5 py-0.5 rounded-none bg-accent-blue/10 text-accent-blue font-medium">
            {post.category}
          </span>
          <span className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{post.readingTime}</span>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-card text-muted-foreground text-xs px-2 py-0.5 rounded border-2 border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="glass-card mt-4 max-w-none overflow-hidden p-4 prose prose-invert prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:bg-card prose-pre:border-2 prose-pre:border-white/5 sm:p-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
