import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'ai-ml': 'AI / ML',
    'data-science': 'Data Science',
    'backend': 'Backend',
    'data-engineering': 'Data Engineering',
    'llm-nlp': 'LLM / NLP',
    'systems': 'Systems',
    'web': 'Web',
  };
  return labels[category] || category;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'active': 'text-blue-400',
    'deployed': 'text-green-400',
    'archived': 'text-gray-400',
    'in-progress': 'text-yellow-400',
  };
  return colors[status] || 'text-gray-400';
}

export function getStatusDotColor(status: string): string {
  const colors: Record<string, string> = {
    'active': 'bg-blue-400',
    'deployed': 'bg-green-400',
    'archived': 'bg-gray-400',
    'in-progress': 'bg-yellow-400',
  };
  return colors[status] || 'bg-gray-400';
}
