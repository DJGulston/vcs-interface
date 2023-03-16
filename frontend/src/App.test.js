import App from './App';
import React from 'react';
import renderer from 'react-test-renderer';

/**
 * Snapshot test to see if the App component renders correctly.
 */
test('App component renders correctly', () => {
  const tree = renderer
  .create(<App gitHubUserResult={[]}
    gitLabUserResult={[]}
    gitHubUserRetrieved={false}
    gitLabUserRetrieved={false}
    gitHubReposResult={[]}
    gitLabReposResult={[]}
    searchHasInput={true}
    username={""}
    gitHubLoading={false}
    gitLabLoading={false}
    gitHubUserFound={true}
    gitLabUserFound={true}
    gitHubReposLoading={false}
    gitLabReposLoading={false}
    selectedGitHubRepoName={""}
    selectedGitLabRepoName={""}
    gitHubCommitsResult={[]}
    gitLabCommitsResult={[]}
    gitHubCommitsLoading={false}
    gitLabCommitsLoading={false}
    isGitHubJsonResponse={true}
    isGitLabJsonResponse={true} />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});