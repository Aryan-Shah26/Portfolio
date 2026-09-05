'use client';

import Link from 'next/link';
import ProjectCard from '@/components/projects/project-card';
import type { Project } from '@/lib/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Featured Projects</h2>
        <Link 
          href="/projects" 
          className="text-sm text-primary-light hover:text-primary transition-colors flex items-center gap-1"
        >
          View all <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
