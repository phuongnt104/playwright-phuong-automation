import { test, expect } from '@fixtures/fixtures';
import githubData from '@test-data/github.json';
import { getTotalOpenIssues, getReposSortedByUpdatedDesc, getMostWatchedRepo } from '@utils/github.helper';

const { organization } = githubData;

test.describe('GitHub API - SeleniumHQ Organization', () => {
  test('Should retrieve and analyze repository information', async ({ githubService }) => {
    const repos = await githubService.getRepos(organization.name);
    expect(repos.length).toBeGreaterThan(0);

    //1. Total open issues
    const totalOpenIssues = getTotalOpenIssues(repos);
    expect(totalOpenIssues).toBeGreaterThanOrEqual(0);

    //2. Sort by updated desc
    const sortedByUpdated = getReposSortedByUpdatedDesc(repos);
    expect(sortedByUpdated.length).toBe(repos.length);
    expect(
      new Date(sortedByUpdated[0].updated_at).getTime()
      >= new Date(sortedByUpdated[1].updated_at).getTime()
    ).toBeTruthy();

    //3. Repo with most watchers
    const mostWatchedRepo = getMostWatchedRepo(repos);
    expect(mostWatchedRepo).not.toBeNull();
  });
});
