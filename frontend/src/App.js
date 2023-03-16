import './App.css';
import React, {Component} from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {NavMenu} from './components/NavMenu.js';
import {UserSearch} from './components/UserSearch.js';
import {GitHubRepos} from './components/GitHubRepos.js';
import {GitLabRepos} from './components/GitLabRepos.js';
import {GitHubCommits} from './components/GitHubCommits.js';
import {GitLabCommits} from './components/GitLabCommits.js';
import {Container, Row, Col} from 'react-bootstrap';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      // Stores GitHub and GitLab user information.
      gitHubUserResult: props.gitHubUserResult,
      gitLabUserResult: props.gitLabUserResult,
      
      // Determines whether the GitHub and GitLab user information has been retrieved.
      gitHubUserRetrieved: props.gitHubUserRetrieved,
      gitLabUserRetrieved: props.gitLabUserRetrieved,
      
      // Stores the GitHub and GitLab repository information for a particular user.
      gitHubReposResult: props.gitHubReposResult,
      gitLabReposResult: props.gitLabReposResult,
      
      // Determines whether a user has typed in a username or not.
      searchHasInput: props.searchHasInput,

      // Stores the searched username.
      username: props.username,

      // Determines whether the GitHub and GitLab search results have loaded already.
      gitHubLoading: props.gitHubLoading,
      gitLabLoading: props.gitLabLoading,

      // Determines whether a username exists or not in GitHub and GitLab.
      gitHubUserFound: props.gitHubUserFound,
      gitLabUserFound: props.gitLabUserFound,

      // Determines whether the GitHub and GitLab repo information has loaded already.
      gitHubReposLoading: props.gitHubReposLoading,
      gitLabReposLoading: props.gitLabReposLoading,

      // Stores the selected GitHub and GitLab repo names.
      selectedGitHubRepoName: props.selectedGitHubRepoName,
      selectedGitLabRepoName: props.selectedGitLabRepoName,

      // Stores the GitHub and GitLab commits results for a particular selected repo name.
      gitHubCommitsResult: props.gitHubCommitsResult,
      gitLabCommitsResult: props.gitLabCommitsResult,

      // Determines whether the GitHub and GitLab commits results have loaded already.
      gitHubCommitsLoading: props.gitHubCommitsLoading,
      gitLabCommitsLoading: props.gitLabCommitsLoading,

      // Determines whether a JSON response could be retrieve from the GitHub and GitLab servers.
      isGitHubJsonResponse: props.isGitHubJsonResponse,
      isGitLabJsonResponse: props.isGitLabJsonResponse

    }

    // Functions that set the GitHub and GitLab JSON response booleans states.
    this.setIsGitHubJsonResponse = this.setIsGitHubJsonResponse.bind(this);
    this.setIsGitLabJsonResponse = this.setIsGitLabJsonResponse.bind(this);

    // Functions that set the JSON results for the GitHub and GitLab user details.
    this.setGitHubUserResult = this.setGitHubUserResult.bind(this);
    this.setGitLabUserResult = this.setGitLabUserResult.bind(this);

    // Functions that set JSON result for the GitHub and GitLab repository details.
    this.setGitHubReposResult = this.setGitHubReposResult.bind(this);
    this.setGitLabReposResult = this.setGitLabReposResult.bind(this);

    // Function that sets a boolean that determines whether a username entered input
    // into the search bar on the Search homepage.
    this.setSearchHasInput = this.setSearchHasInput.bind(this);

    // Functions that sets the searched username.
    this.setUsername = this.setUsername.bind(this);

    // Functions that set booleans that determine whether the GitHub and GitLab
    // user information has been retrieved.
    this.setGitHubUserRetrieved = this.setGitHubUserRetrieved.bind(this);
    this.setGitLabUserRetrieved = this.setGitLabUserRetrieved.bind(this);

    // Functions that set booleans that determine whether the GitHub and GitLab Search
    // results are still loading (being retrieved from the API).
    this.setGitHubLoading = this.setGitHubLoading.bind(this);
    this.setGitLabLoading = this.setGitLabLoading.bind(this);

    // Functions that set booleans that determine whether the searched username exists
    // on GitHub and GitLab.
    this.setGitHubUserFound = this.setGitHubUserFound.bind(this);
    this.setGitLabUserFound = this.setGitLabUserFound.bind(this);

    // Functions that set booleans that determine whether the GitHub and GitLab repo
    // results are still loading (being retrieved from the API).
    this.setGitHubReposLoading = this.setGitHubReposLoading.bind(this);
    this.setGitLabReposLoading = this.setGitLabReposLoading.bind(this);

    // Functions that set the selected GitHub and GitLab repository names.
    this.setSelectedGitHubRepoName = this.setSelectedGitHubRepoName.bind(this);
    this.setSelectedGitLabRepoName = this.setSelectedGitLabRepoName.bind(this);

    // Functions that set the GitHub and GitLab commits results for a selected
    // repository.
    this.setGitHubCommitsResult = this.setGitHubCommitsResult.bind(this);
    this.setGitLabCommitsResult = this.setGitLabCommitsResult.bind(this);

    // Functions that set the booleans that determine whether the GitHub and GitLab commits
    // results are still loading (being retrieved from the API).
    this.setGitHubCommitsLoading = this.setGitHubCommitsLoading.bind(this);
    this.setGitLabCommitsLoading = this.setGitLabCommitsLoading.bind(this);

  }

  // Group of functions below that set the states.

  setIsGitHubJsonResponse(isGitHubJsonResponse) {
    this.setState({
      isGitHubJsonResponse: isGitHubJsonResponse
    });
  }

  setIsGitLabJsonResponse(isGitLabJsonResponse) {
    this.setState({
      isGitLabJsonResponse: isGitLabJsonResponse
    });
  }

  setGitHubCommitsLoading(gitHubCommitsLoading) {
    this.setState({
      gitHubCommitsLoading: gitHubCommitsLoading
    });
  }

  setGitLabCommitsLoading(gitLabCommitsLoading) {
    this.setState({
      gitLabCommitsLoading: gitLabCommitsLoading
    });
  }

  setGitHubCommitsResult(gitHubCommitsResult) {
    this.setState({
      gitHubCommitsResult: gitHubCommitsResult
    });
  }

  setGitLabCommitsResult(gitLabCommitsResult) {
    this.setState({
      gitLabCommitsResult: gitLabCommitsResult
    });
  }

  setSelectedGitHubRepoName(selectedGitHubRepoName) {
    this.setState({
      selectedGitHubRepoName: selectedGitHubRepoName
    });
  }

  setSelectedGitLabRepoName(selectedGitLabRepoName) {
    this.setState({
      selectedGitLabRepoName: selectedGitLabRepoName
    });
  }

  setGitLabReposLoading(gitLabReposLoading) {
    this.setState({
      gitLabReposLoading: gitLabReposLoading
    });
  }

  setGitHubReposLoading(gitHubReposLoading) {
    this.setState({
      gitHubReposLoading: gitHubReposLoading
    });
  }

  setGitHubUserFound(gitHubUserFound) {
    this.setState({
      gitHubUserFound: gitHubUserFound
    });
  }

  setGitLabUserFound(gitLabUserFound) {
    this.setState({
      gitLabUserFound: gitLabUserFound
    });
  }

  setGitHubLoading(gitHubLoading) {
    this.setState({
      gitHubLoading: gitHubLoading
    });
  }

  setGitLabLoading(gitLabLoading) {
    this.setState({
      gitLabLoading: gitLabLoading
    });
  }

  setGitHubUserResult(gitHubUserResult) {
    this.setState({
      gitHubUserResult: gitHubUserResult
    });
  }

  setGitHubReposResult(gitHubReposResult) {
    this.setState({
      gitHubReposResult: gitHubReposResult
    });
  }

  setGitLabUserResult(gitLabUserResult) {
    this.setState({
      gitLabUserResult: gitLabUserResult
    });
  }

  setSearchHasInput(searchHasInput) {
    this.setState({
      searchHasInput: searchHasInput
    });
  }

  setUsername(username) {
    this.setState({
      username: username
    });
  }

  setGitHubUserRetrieved(gitHubUserRetrieved) {
    this.setState({
      gitHubUserRetrieved: gitHubUserRetrieved
    });
  }

  setGitLabReposResult(gitLabReposResult) {
    this.setState({
      gitLabReposResult: gitLabReposResult
    });
  }

  setGitLabUserRetrieved(gitLabUserRetrieved) {
    this.setState({
      gitLabUserRetrieved: gitLabUserRetrieved
    });
  }

  /**
   * Renders the VCS Interface page.
   * @returns 
   */
  render() {
    return (
      <BrowserRouter>
        <div>
    
          {/*
            Displays the header at the top of the page. Header includes a navigation menu that allows the user
            to navigate back to the Search homepage.
          */}
          <header className='main-header'>

            <div className='header-item-section'>
              <span className='header-item-1'>VCS Interface</span>
              <NavMenu />
            </div>

          </header>

          {/* Container that displays the main content of the page, i.e. all the routes of the website. */}
          <Container style={{
            marginTop:'90px'
          }}>
            <Row>
              <Col md={12}>
                <Routes>

                  {/* Route of the home page that allows the user to search GitHub and GitLab for a particular username. */}
                  <Route exact path='/' element={<UserSearch setGitHubUserResult={this.setGitHubUserResult} 
                                                            setGitHubReposResult={this.setGitHubReposResult} 
                                                            setGitLabUserResult={this.setGitLabUserResult}
                                                            setGitLabReposResult={this.setGitLabReposResult} 
                                                            setSearchHasInput={this.setSearchHasInput}
                                                            setUsername={this.setUsername}
                                                            setGitHubUserRetrieved={this.setGitHubUserRetrieved}
                                                            setGitLabUserRetrieved={this.setGitLabUserRetrieved}
                                                            setGitHubLoading={this.setGitHubLoading}
                                                            setGitLabLoading={this.setGitLabLoading}
                                                            setGitHubUserFound={this.setGitHubUserFound}
                                                            setGitLabUserFound={this.setGitLabUserFound}
                                                            setGitHubReposLoading={this.setGitHubReposLoading}
                                                            setGitLabReposLoading={this.setGitLabReposLoading}
                                                            setIsGitHubJsonResponse={this.setIsGitHubJsonResponse}
                                                            setIsGitLabJsonResponse={this.setIsGitLabJsonResponse}
                                                            gitHubUserResult={this.state.gitHubUserResult}
                                                            gitLabUserResult={this.state.gitLabUserResult}
                                                            searchHasInput={this.state.searchHasInput}
                                                            username={this.state.username}
                                                            gitHubUserRetrieved={this.state.gitHubUserRetrieved}
                                                            gitLabUserRetrieved={this.state.gitLabUserRetrieved}
                                                            gitHubLoading={this.state.gitHubLoading}
                                                            gitLabLoading={this.state.gitLabLoading}
                                                            gitHubUserFound={this.state.gitHubUserFound}
                                                            gitLabUserFound={this.state.gitLabUserFound}
                                                            isGitHubJsonResponse={this.state.isGitHubJsonResponse}
                                                            isGitLabJsonResponse={this.state.isGitLabJsonResponse} />} />

                  {/* Route for the GitHub repository page that displays the list of repositories for the searched user. */}
                  <Route exact path='/repos/github' element={<GitHubRepos gitHubReposResult={this.state.gitHubReposResult}
                                                                          gitHubReposLoading={this.state.gitHubReposLoading}
                                                                          setGitHubCommitsLoading={this.setGitHubCommitsLoading}
                                                                          setGitHubCommitsResult={this.setGitHubCommitsResult}
                                                                          setSelectedGitHubRepoName={this.setSelectedGitHubRepoName}
                                                                          username={this.state.username} />} />

                  {/* Route for the GitLab repository page that displays the list of repositories for the searched user. */}
                  <Route exact path='/repos/gitlab' element={<GitLabRepos gitLabReposResult={this.state.gitLabReposResult}
                                                                          gitLabReposLoading={this.state.gitLabReposLoading}
                                                                          setGitLabCommitsLoading={this.setGitLabCommitsLoading}
                                                                          setGitLabCommitsResult={this.setGitLabCommitsResult}
                                                                          setSelectedGitLabRepoName={this.setSelectedGitLabRepoName} />} />

                  {/* Route for the GitHub commits page that displays the list of the 5 most recent commits for the searched user. */}
                  <Route exact path='/commits/github' element={<GitHubCommits selectedGitHubRepoName={this.state.selectedGitHubRepoName}
                                                                              gitHubCommitsResult={this.state.gitHubCommitsResult}
                                                                              gitHubCommitsLoading={this.state.gitHubCommitsLoading} />} />

                  {/* Route for the GitLab commits page that displays the list of the 5 most recent commits for the searched user. */}
                  <Route exact path='/commits/gitlab' element={<GitLabCommits selectedGitLabRepoName={this.state.selectedGitLabRepoName}
                                                                              gitLabCommitsResult={this.state.gitLabCommitsResult}
                                                                              gitLabCommitsLoading={this.state.gitLabCommitsLoading} />} />

                </Routes>
              </Col>
            </Row>
          </Container>
          

        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;

/*

References:

How to use useState in React:
- https://reactjs.org/docs/hooks-state.html

How to make a loading icon in CSS:
- https://www.w3schools.com/howto/howto_css_loader.asp

What is the base URL endpoint for GitLab API:
- https://stackoverflow.com/questions/39751840/cant-find-out-base-gitlab-api-base-url

How to get list of commits for repository in GitLab:
- https://docs.gitlab.com/ee/api/commits.html

How to get list of repositories in GitLab:
- https://docs.gitlab.com/ee/api/projects.html

How to get user info in GitLab:
- https://docs.gitlab.com/ee/api/users.html

How to get user info in GitHub:
- https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user

How to get list of repositories in GitHub:
- https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28

How to get list of commits for repository in GitHub:
- https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28

How to render an X unicode symbol in React:
- https://medium.com/@jamesncox/rendering-unicode-symbol-in-react-76b1b4ffcee4

How to display arrows unicode symbols in React:
- https://www.w3schools.com/charsets/ref_utf_arrows.asp

How to pass custom data through an HTML element using a custom data attribute:
- https://www.w3schools.com/tags/att_global_data.asp
- https://stackoverflow.com/questions/432174/how-to-store-arbitrary-data-for-some-html-tags

How to make numbers of ordered list bold:
- https://stackoverflow.com/questions/21369843/is-there-a-way-to-make-numbers-in-an-ordered-list-bold

How to check if a variable is an array:
- https://www.w3schools.com/jsref/jsref_isarray.asp

How to use grid display layout in CSS:
- https://www.w3schools.com/css/css_grid_container.asp

*/
