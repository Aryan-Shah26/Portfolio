"use client";

import Link from "next/link";
import { Star, GitFork } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import type { Project } from "@/lib/types";
import { cn, getStatusColor, getStatusDotColor } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const categoryLabel = PROJECT_CATEGORIES.find(
    (category) => category.value === project.category
  )?.label ?? project.category;

  return (
    <div className="glass-card p-5 hover:glow-sm transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-foreground">
            <Link href={`/projects/${project.slug}`} className="hover:text-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {project.name}
            </Link>
          </h3>
          {project.status && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  getStatusDotColor(project.status)
                )}
              />
              <span
                className={cn(
                  "text-xs capitalize",
                  getStatusColor(project.status)
                )}
              >
                {project.status.replace("-", " ")}
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted line-clamp-2 mt-2 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="text-xs px-2 py-0.5 rounded-none bg-accent-cyan/10 text-accent-cyan">
            {categoryLabel}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-none bg-primary/10 text-primary-light"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{project.forks}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-accent-cyan hover:text-accent-cyan/80 transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
    </div>
  );
}

export default ProjectCard;
