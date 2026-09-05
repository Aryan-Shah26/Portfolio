export function getEnv() {
  const token = process.env.GITHUB_API_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('GITHUB_API_TOKEN and GITHUB_USERNAME environment variables must be defined in production.');
    } else {
      console.warn('WARNING: GITHUB_API_TOKEN or GITHUB_USERNAME is missing. Using empty strings as fallback in development.');
      return { token: token || '', username: username || '' };
    }
  }

  return { token, username };
}
