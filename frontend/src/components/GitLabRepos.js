import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import React from 'react';

/**
 * Component that displays the list of GitLab repositories for a particular username.
 * @param {*} props 
 * @returns 
 */
export function GitLabRepos(props) {

    // GitLab repo results and loading boolean state obtained.
    const repoList = props.gitLabReposResult;
    const gitLabReposLoading = props.gitLabReposLoading;

    /**
     * Function that sets the GitLab commits result for a particular searched repo.
     * @param {*} result 
     */
    function setGitLabCommitsResult(result) {
        props.setGitLabCommitsResult(result);
    }

    /**
     * Function that sets the GitLab commits loading boolean state.
     * @param {*} isLoading 
     */
    function setGitLabCommitsLoading(isLoading) {
        props.setGitLabCommitsLoading(isLoading);
    }

    /**
     * Function that sets the selected GitLab repo name.
     * @param {*} repoName 
     */
    function setSelectedGitLabRepoName(repoName) {
        props.setSelectedGitLabRepoName(repoName);
    }

    /**
     * Function that sets the GitLab commits results for a selected GitHub repo name.
     * @param {*} e 
     */
    function fetchCommits(e) {

        // Sets the GitHub commits loading boolean state to true.
        setGitLabCommitsLoading(true);

        // Obtains the repo ID from the clicked repo.
        const repoId = e.target.id;

        // Obtains the repo name from the clicked repo via a custom HTML element attribute.
        const repoName = e.target.getAttribute('data-repo-name');

        // Sets the selected GitLab repo name.
        setSelectedGitLabRepoName(repoName);

        // GET request that obtains the 5 most recent commits for the selected GitLab repo.
        fetch(`/api/gitlab/${repoId}/commits`, {method: 'GET'})
        .then(result => result.json())
        .then((result) => {

            // Sets the GitLab commits results for the selected repo, and sets the GitLab
            // commits loading boolean state since we have already retrieved the GitLab commits
            // result from the API.
            setGitLabCommitsResult(result);
            setGitLabCommitsLoading(false);
        });
    }

    // Maps the GitLab repo JSON object array to a DIV element containing all the repo information.
    const repoNames = repoList.map((repo) => 

        <div id={repo.name} className='repo-section' key={repo.id.toString()}>
            <h3><a href={repo.web_url} target="_blank" rel='noreferrer' className='external-link'>{repo.name}</a></h3>
            <p><b>Date Created:</b> {new Date(Date.parse(repo.created_at)).toDateString()}</p>
            <p><b>Last commit:</b> {new Date(Date.parse(repo.last_activity_at)).toDateString()}</p>
            <p><b>Description:</b> {repo.description}</p>

            {/* Link that navigates the user to the GitLab commits page. */}
            <Link className='internal-link' to='/commits/gitlab' id={repo.id.toString()} onClick={fetchCommits} data-repo-name={repo.name}>
                Last 5 commits {'\u2192'}
            </Link>
        </div>

    );

    // If the GitLab repos results are still being retrieved from the API, we display a loading icon.
    if(gitLabReposLoading) {
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
                    <h1>GitLab Repositories</h1>
                    <div className='loading-icon'></div>
                </div>
            </Card>
        );
    }
    else {

        // If the GitLab repos results have been retrieved from the API, we display the repo results.
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
                    <h1>GitLab Repositories</h1>
                    <Link className='internal-link' to='/'>{'\u2190'} User Details</Link>
                    <div className='repo-list'>
                        {repoNames}
                    </div>
                </div>
            </Card>
        );
    }
    
    
}