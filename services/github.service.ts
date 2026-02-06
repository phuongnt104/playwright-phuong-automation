import { APIRequestContext } from '@playwright/test';
import { Repository } from '@app-types/github.types';

export class GithubService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  /**
   * Get all repositories for an organization
   */
  async getRepos(orgName: string, perPage = 100): Promise<Repository[]> {
    const response = await this.apiContext.get(`/orgs/${orgName}/repos`, {
      params: {
        per_page: perPage.toString()
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to fetch repos: ${response.status()}`);
    }

    return response.json();
  }
}
