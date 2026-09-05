'use client';

import { Search } from 'lucide-react';
import { PROJECT_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function ProjectFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          id="project-search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-card border-2 border-border rounded-none pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
        />
        <label htmlFor="project-search" className="sr-only">Search projects</label>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => onCategoryChange('all')}
          className={cn(
            'px-3 py-1.5 rounded-none text-xs font-medium border-2 transition-colors',
            selectedCategory === 'all'
              ? 'bg-primary/20 text-primary-light border-primary/30'
              : 'bg-card text-muted-foreground border-border hover:border-border-hover'
          )}
        >
          All
        </button>
        {PROJECT_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={cn(
              'px-3 py-1.5 rounded-none text-xs font-medium border-2 transition-colors',
              selectedCategory === category.value
                ? 'bg-primary/20 text-primary-light border-primary/30'
                : 'bg-card text-muted-foreground border-border hover:border-border-hover'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <select
          id="project-status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-card border-2 border-border text-foreground rounded-none px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="deployed">Deployed</option>
          <option value="in-progress">In Progress</option>
          <option value="archived">Archived</option>
        </select>

        <select
          id="project-sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-card border-2 border-border text-foreground rounded-none px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
          <option value="active">Recently Updated</option>
        </select>
      </div>
    </div>
  );
}
