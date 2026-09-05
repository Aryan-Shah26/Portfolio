import type { GitHubStats, GitHubContribution } from '@/lib/types';
import { getEnv } from '@/lib/env';

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
};

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_REST_API = 'https://api.github.com';

export async function getGitHubReadme(repositoryName: string): Promise<string | null> {
  const { token, username } = getEnv();
  if (!token || !username) return null;

  try {
    const response = await fetch(
      `${GITHUB_REST_API}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repositoryName)}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 3600 },
      }
    );

    if (response.status === 404) return null;
    if (!response.ok) {
      console.error(`GitHub README error for ${repositoryName}:`, await response.text());
      return null;
    }

    const data = (await response.json()) as { content?: string; encoding?: string };
    if (!data.content) return null;

    return data.encoding === 'base64'
      ? Buffer.from(data.content.replace(/\s/g, ''), 'base64').toString('utf8')
      : data.content;
  } catch (error) {
    console.error(`Failed to fetch README for ${repositoryName}:`, error);
    return null;
  }
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const { token, username } = getEnv();

  const fallbackData: GitHubStats = {
    totalRepos: 0,
    totalContributions: 0,
    totalStars: 0,
    topLanguages: [],
    topRepos: [],
    recentActivity: [],
    contributionData: [],
  };

  if (!token || !username) {
    return { ...fallbackData, error: 'GitHub is not configured.' };
  }

  const query = `
    query($username: String!, $cursor: String) {
      user(login: $username) {
        repositories(first: 100, after: $cursor, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          pageInfo { hasNextPage endCursor }
          nodes {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage { name }
            url
            homepageUrl
            createdAt
            updatedAt
            isArchived
            isFork
            issues(states: OPEN) { totalCount }
            watchers { totalCount }
            licenseInfo { name }
            diskUsage
            repositoryTopics(first: 20) { nodes { topic { name } } }
            languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node { name color }
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    type RepositoryNode = {
      name: string;
      description?: string;
      stargazerCount: number;
      forkCount: number;
      primaryLanguage?: { name: string };
      url: string;
      homepageUrl?: string;
      createdAt: string;
      updatedAt: string;
      isArchived: boolean;
      isFork: boolean;
      issues: { totalCount: number };
      watchers: { totalCount: number };
      licenseInfo?: { name: string };
      diskUsage?: number;
      repositoryTopics: { nodes: { topic: { name: string } }[] };
      languages?: { edges: { size: number; node: { name: string; color: string } }[] };
    };
    type GraphQLResponse = {
      data?: {
        user: {
          repositories: {
            totalCount: number;
            pageInfo: { hasNextPage: boolean; endCursor: string | null };
            nodes: RepositoryNode[];
          };
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: number;
              weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
            };
          };
        };
      };
      errors?: unknown[];
    };

    let cursor: string | null = null;
    let totalRepos = 0;
    let totalContributions = 0;
    const repositories: RepositoryNode[] = [];
    const contributionData: GitHubContribution[] = [];

    do {
      const response: Response = await fetch(GITHUB_GRAPHQL_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { username, cursor } }),
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        const details = await response.text();
        console.error('GitHub API error:', details);
        return { ...fallbackData, error: 'GitHub could not be reached.' };
      }

      const { data, errors } = (await response.json()) as GraphQLResponse;
      if (errors?.length || !data?.user) {
        console.error('GitHub GraphQL error:', errors || 'User not found');
        return { ...fallbackData, error: 'GitHub returned invalid data.' };
      }

      const user = data.user;
      totalRepos = user.repositories.totalCount;
      repositories.push(...(user.repositories.nodes as RepositoryNode[]));

      if (!cursor) {
        totalContributions = user.contributionsCollection.contributionCalendar.totalContributions;
        user.contributionsCollection.contributionCalendar.weeks.forEach((week: { contributionDays: { date: string; contributionCount: number }[] }) => {
          week.contributionDays.forEach((day) => {
            contributionData.push({ date: day.date, count: day.contributionCount });
          });
        });
      }

      cursor = user.repositories.pageInfo.hasNextPage
        ? user.repositories.pageInfo.endCursor
        : null;
    } while (cursor);

    const recentActivity = contributionData.slice(-30);

    let totalStars = 0;
    const languageSizes: Record<string, number> = {};
    let totalSize = 0;
    
    repositories.forEach((repo) => {
      totalStars += repo.stargazerCount;
      if (repo.languages && repo.languages.edges) {
        repo.languages.edges.forEach((edge) => {
          const langName = edge.node.name;
          const size = edge.size;
          languageSizes[langName] = (languageSizes[langName] || 0) + size;
          totalSize += size;
        });
      }
    });

    const sortedLanguages = Object.entries(languageSizes)
      .sort((a, b) => b[1] - a[1]);
      
    const topLanguages = sortedLanguages.slice(0, 5).map(([name, size]) => ({
      name,
      percentage: totalSize > 0 ? Math.round((size / totalSize) * 100 * 10) / 10 : 0,
      color: LANGUAGE_COLORS[name] || '#6b7280',
    }));
    
    if (sortedLanguages.length > 5) {
      const otherSize = sortedLanguages.slice(5).reduce((acc, [, size]) => acc + size, 0);
      topLanguages.push({
        name: 'Other',
        percentage: totalSize > 0 ? Math.round((otherSize / totalSize) * 100 * 10) / 10 : 0,
        color: '#6b7280',
      });
    }

    const topRepos = repositories.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.primaryLanguage ? repo.primaryLanguage.name : 'Unknown',
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      url: repo.url,
      updatedAt: repo.updatedAt,
      createdAt: repo.createdAt,
      homepageUrl: repo.homepageUrl || undefined,
      topics: repo.repositoryTopics.nodes.map(({ topic }) => topic.name),
      isArchived: repo.isArchived,
      isFork: repo.isFork,
      openIssues: repo.issues.totalCount,
      watchers: repo.watchers.totalCount,
      license: repo.licenseInfo?.name,
      size: repo.diskUsage,
      languages: repo.languages?.edges.map((edge) => ({
        name: edge.node.name,
        color: edge.node.color,
        size: edge.size,
      })),
    }));

    return {
      totalRepos,
      totalContributions,
      totalStars,
      topLanguages,
      topRepos,
      recentActivity,
      contributionData,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    return { ...fallbackData, error: 'GitHub data is temporarily unavailable.' };
  }
}
