'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProjectFilters } from '@/components/projects/project-filters';
import { ProjectCard } from '@/components/projects/project-card';
import type { Project, GitHubStats } from '@/lib/types';

const PROJECT_CATEGORY_OVERRIDES: Record<string, Project['category']> = {
  'chat-engine': 'llm-nlp',
  'research-paper-bot': 'llm-nlp',
  'eda-agent': 'data-science',
  'm5-forecasting': 'data-science',
  'mastercard-fraud-sim': 'data-science',
  'ai-city-simulator': 'llm-nlp',
  'internship-tracker': 'data-engineering',
};

function getProjectCategory(repo: GitHubStats['topRepos'][number]): Project['category'] {
  const normalizedName = repo.name.toLowerCase().replace(/[_\s]+/g, '-');
  const explicitCategory = PROJECT_CATEGORY_OVERRIDES[normalizedName];
  if (explicitCategory) return explicitCategory;

  const metadata = [repo.name, repo.description, repo.language, ...(repo.topics || [])]
    .join(' ')
    .toLowerCase();

  if (/(llm|nlp|langchain|transformer|embedding|retrieval|rag)/.test(metadata)) return 'llm-nlp';
  if (/(\bai\b|\bml\b|machine.learning|pytorch|tensorflow|scikit)/.test(metadata)) return 'ai-ml';
  if (/(data.engineer|etl|pipeline|spark|airflow|duckdb)/.test(metadata)) return 'data-engineering';
  if (/(backend|api|fastapi|django|express|server)/.test(metadata)) return 'backend';
  if (/(system|c\+\+|rust|kernel|embedded)/.test(metadata)) return 'systems';
  if (/(web|react|next\.js|html|css|frontend)/.test(metadata)) return 'web';
  return 'data-science';
}

function getProjectStatus(repo: GitHubStats['topRepos'][number]): Project['status'] {
  if (repo.isArchived) return 'archived';
  if (repo.homepageUrl) return 'deployed';
  return 'active';
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetch('/api/github-stats')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub stats request failed');
        return res.json();
      })
      .then((data: GitHubStats) => {
        // Map GitHub repos to Project objects
        const mapped: Project[] = (data.topRepos || []).map((repo) => ({
          slug: repo.name,
          name: repo.name,
          description: repo.description || 'No description available',
          category: getProjectCategory(repo),
          tags: [repo.language, ...(repo.topics || [])].filter(Boolean),
          technologies: (repo.languages || []).map((language) => language.name),
          status: getProjectStatus(repo),
          stars: repo.stars,
          forks: repo.forks,
          githubUrl: repo.url,
          demoUrl: repo.homepageUrl,
          lastUpdated: repo.updatedAt,
          createdAt: repo.createdAt || repo.updatedAt,
        }));
        setProjects(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          search === '' ||
          project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase()) ||
          project.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        }
        if (sortBy === 'popular') {
          return (b.stars || 0) - (a.stars || 0);
        }
        if (sortBy === 'active') {
          return new Date(b.lastUpdated || b.createdAt || '').getTime() - new Date(a.lastUpdated || a.createdAt || '').getTime();
        }
        return 0;
      });
  }, [projects, search, selectedCategory, selectedStatus, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Project Explorer</h1>
          <p className="text-muted mt-2">Explore what I&apos;ve built.</p>
        </div>
        <div className="glass-card p-12 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading projects from GitHub...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Project Explorer</h1>
        <p className="text-muted mt-2">Explore what I&apos;ve built.</p>
      </div>

      <ProjectFilters
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="mt-8 mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card mt-4 rounded-none">
          <p className="text-muted-foreground mb-4">No projects match your filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="px-4 py-2 bg-primary/20 text-primary-light rounded-none hover:bg-primary/30 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
