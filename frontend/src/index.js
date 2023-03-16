import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App gitHubUserResult={[]}
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
          isGitLabJsonResponse={true} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
