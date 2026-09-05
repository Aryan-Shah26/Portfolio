import Link from 'next/link';
import { getPublishedPosts } from '@/lib/services/blog';

export const metadata = {
  title: 'Blog',
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="flex flex-col gap-8 pb-10">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Blog</h1>
        <p className="text-muted">Technical writing on AI, ML, and engineering.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.slug} className="glass-card p-6 group transition-all hover:bg-card/60">
            <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs px-2.5 py-0.5 rounded-none bg-accent-blue/10 text-accent-blue font-medium">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary-light transition-colors mb-2">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-card text-muted-foreground text-xs px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
