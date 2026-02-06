/**
 * Interface Repository
 */
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  open_issues_count: number;
  updated_at: string;
}