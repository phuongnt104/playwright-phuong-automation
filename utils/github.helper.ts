import { Repository } from '@app-types/github.types';

/**
 * Sum of open_issues_count across all repositories
 */
export function getTotalOpenIssues(repos: Repository[]): number {
  if (!repos?.length) return 0;

  return repos.reduce(
    (sum, repo) => sum + (repo.open_issues_count ?? 0),
    0
  );
}

/**
 * Sort repositories by updated_at descending (most recent first)
 */
export function getReposSortedByUpdatedDesc(repos: Repository[]): Repository[] {
  return [...repos].sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

/**
 * Find repository with maximum watchers_count
 */
export function getMostWatchedRepo(repos: Repository[]): Repository | null {
  if (repos.length === 0) return null;

  return repos.reduce((max, repo) =>
    repo.watchers_count > max.watchers_count ? repo : max
  );
}
