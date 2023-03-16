import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import React from 'react';

/**
 * Component that displays the list of GitHub repositories for a particular username.
 * @param {*} props 
 * @returns 
 */
export function GitHubRepos(props) {

    // GitHub repo results, loading boolean state and searched username obtained.
    const repoList = props.gitHubReposResult;
    const gitHubReposLoading = props.gitHubReposLoading;
    const username = props.username;

    /**
     * Function that sets the GitHub commits result for a particular searched repo.
     * @param {*} result 
     */
    function setGitHubCommitsResult(result) {
        props.setGitHubCommitsResult(result);
    }

    /**
     * Function that sets the GitHub commits loading boolean state.
     * @param {*} isLoading 
     */
    function setGitHubCommitsLoading(isLoading) {
        props.setGitHubCommitsLoading(isLoading);
    }

    /**
     * Function that sets the selected GitHub repo name.
     * @param {*} repoName 
     */
    function setSelectedGitHubRepoName(repoName) {
        props.setSelectedGitHubRepoName(repoName);
    }

    /**
     * Function that sets the GitHub commits results for a selected GitHub repo name.
     * @param {*} e 
     */
    function fetchCommits(e) {

        // Sets the GitHub commits loading boolean state to true.
        setGitHubCommitsLoading(true);

        // Obtains the repo name from the clicked repo.
        const repoName = e.target.id;

        // Sets the selected GitHub repo name.
        setSelectedGitHubRepoName(repoName);

        // GET request that obtains the 5 most recent commits for the selected GitHub repo.
        fetch(`/api/github/${username}/${repoName}/commits`, {method: 'GET'})
        .then(result => result.json())
        .then((result) => {

            // Sets the GitHub commits results for the selected repo, and sets the GitHub
            // commits loading boolean state since we have already retrieved the GitHub commits
            // result from the API.
            setGitHubCommitsResult(result);
            setGitHubCommitsLoading(false);
        });
    }

    // Maps the GitHub repo JSON object array to a DIV element containing all the repo information.
    const repoNames = repoList.map((repo) =>

        <div className='repo-section' key={repo.name}>
            <h3><a href={repo.html_url} target="_blank" rel='noreferrer' className='external-link'>{repo.name}</a></h3>
            <p><b>Date Created:</b> {new Date(Date.parse(repo.created_at)).toDateString()}</p>
            <p><b>Last Commit:</b> {new Date(Date.parse(repo.pushed_at)).toDateString()}</p>
            <p><b>Description:</b> {repo.description}</p>
            
            {/* Link that navigates the user to the GitHub commits page. */}
            <Link className='internal-link' to='/commits/github' id={repo.name} onClick={fetchCommits}>
                Last 5 commits {'\u2192'}
            </Link>
        </div>

    );

    // If the GitHub repos results are still being retrieved from the API, we display a loading icon.
    if(gitHubReposLoading) {
        return(
            <Card style={{
                margin:'40px auto',
                padding:'30px',
                width:'100%',
                border:'1px solid rgb(100, 100, 100)',
                borderRadius:'25px',
                backgroundColor:'rgb(50, 50, 50)'
            }}>
                <div>
                    <h1>GitHub Repositories</h1>
                    <div className='loading-icon'></div>
                </div>
            </Card>
        );
    }
    else {

        // If the GitHub repos results have been retrieved from the API, we display the repo results.
        return(
            <Card style={{
                margin:'40px auto',
                padding:'30px',
                width:'100%',
                border:'1px solid rgb(100, 100, 100)',
                borderRadius:'25px',
                backgroundColor:'rgb(50, 50, 50)'
            }}>
                <div>
                    <h1>GitHub Repositories</h1>
                    <Link className='internal-link' to='/'>{'\u2190'} User Details</Link>
                    <div className='repo-list'>
                        {repoNames}
                    </div>
                </div>
            </Card>
        );
    }
    
    
}