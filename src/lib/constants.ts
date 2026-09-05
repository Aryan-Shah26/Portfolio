import type { NavItem } from './types';

export const SITE_CONFIG = {
  name: 'Aryan Shah',
  title: 'Engineering Observatory',
  description: 'AI/ML Engineer & Data Scientist — Explore projects, experiments, and engineering work through data.',
  url: 'https://aryanshah.dev',
  github: 'https://github.com/Aryan-Shah26',
  linkedin: 'https://linkedin.com/in/aryan-shah26',
  codeforces: 'https://codeforces.com/profile/aryan_shah26',
  email: 'aryan26110417@gmail.com',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', href: '/', icon: 'LayoutDashboard' },
  { name: 'Projects', href: '/projects', icon: 'FolderGit2' },
  { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { name: 'AI Assistant', href: '/ai', icon: 'Bot' },
  { name: 'Resume', href: '/resume', icon: 'FileText' },
  { name: 'Contact', href: '/contact', icon: 'Mail' },
];

export const PROJECT_CATEGORIES = [
  { value: 'ai-ml', label: 'AI / ML' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'backend', label: 'Backend' },
  { value: 'data-engineering', label: 'Data Engineering' },
  { value: 'llm-nlp', label: 'LLM / NLP' },
  { value: 'systems', label: 'Systems' },
  { value: 'web', label: 'Web' },
] as const;

export const PROJECT_STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'deployed', label: 'Deployed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'archived', label: 'Archived' },
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'active', label: 'Most Active' },
] as const;
