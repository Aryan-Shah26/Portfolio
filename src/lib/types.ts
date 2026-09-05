export type ProjectStatus = 'active' | 'deployed' | 'archived' | 'in-progress';
export type ProjectCategory = 'ai-ml' | 'data-science' | 'backend' | 'data-engineering' | 'llm-nlp' | 'systems' | 'web';

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  technologies?: string[];
  status?: ProjectStatus;
  featured?: boolean;
  stars?: number;
  forks?: number;
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  architecture?: ArchitectureSection;
  technicalDetails?: TechnicalDetails;
  evaluation?: EvaluationMetric[];
  failureCases?: string[];
  engineeringDecisions?: EngineeringDecision[];
  lastUpdated?: string;
  createdAt?: string;
}

export interface ArchitectureSection {
  description: string;
  components: ArchitectureComponent[];
}

export interface ArchitectureComponent {
  name: string;
  description: string;
  technology: string;
}

export interface TechnicalDetails {
  models?: string[];
  algorithms?: string[];
  apis?: string[];
  databases?: string[];
  infrastructure?: string[];
  keyDecisions?: string[];
}

export interface EvaluationMetric {
  name: string;
  value: string;
  unit?: string;
  description?: string;
}

export interface EngineeringDecision {
  decision: string;
  rationale: string;
  tradeoffs: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  trend?: {
    value: number;
    label: string;
  };
}

export interface GitHubContribution {
  date: string;
  count: number;
  repository?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
  createdAt?: string;
  homepageUrl?: string;
  topics?: string[];
  isArchived?: boolean;
  isFork?: boolean;
  openIssues?: number;
  watchers?: number;
  license?: string;
  size?: number;
  languages?: { name: string; color: string; size: number }[];
}

export interface GitHubStats {
  error?: string;
  totalRepos: number;
  totalContributions: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  recentActivity: GitHubContribution[];
  topRepos: GitHubRepo[];
  contributionData: GitHubContribution[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  description: string;
  tags: string[];
  content: string;
  published: boolean;
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights: string[];
}

export interface ResumeExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  location: string;
  summary: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  skills: { category: string; items: string[] }[];
  achievements: string[];
  leadership: { role: string; organization: string; description: string; period: string }[];
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: AISource[];
  timestamp: Date;
}

export interface AISource {
  title: string;
  type: 'project' | 'resume' | 'blog' | 'github';
  url?: string;
  slug?: string;
  snippet: string;
}

export interface AIKnowledgeEntry {
  patterns: string[];
  response: string;
  sources: AISource[];
}

export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export interface TechUsage {
  name: string;
  count: number;
  category: 'language' | 'framework' | 'tool' | 'cloud' | 'database';
}
