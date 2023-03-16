import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import React from 'react';

/**
 * Component that displays the list of GitHub commits for a particular repository.
 * @param {*} props 
 * @returns 
 */
export function GitHubCommits(props) {

    // Obtains the GitHub commits loading boolean state, the commits result and the selected repo name.
    const commitsLoading = props.gitHubCommitsLoading;
    const commitsResult = props.gitHubCommitsResult;
    const selectedRepoName = props.selectedGitHubRepoName;

    // Maps the GitHub commits JSON result to a list of commit messages.
    const commitsMessages = commitsResult.map((commitRes) => 
        <div className='commit-message' key={commitRes.node_id}>
            <li><b>{new Date(Date.parse(commitRes.commit.committer.date)).toDateString()}</b></li>
            <p><span className='commit-message-label'>{'\u2192'} Message:</span> "{commitRes.commit.message}"</p>
        </div>
    );
    
    // If the GitHub commits result has not yet been retrieved by the API, i.e. still loading,
    // then we return a loading icon.
    if(commitsLoading) {
        return(
            <Card style={{
                margin:'40px auto',
                padding:'30px',
                width:'100%',
                border:'1px solid rgb(100, 100, 100)',
                borderRadius:'25px',
                backgroundColor:'rgb(50, 50, 50)'
            }}>
                <h1>GitHub Commits</h1>
                <Link className='internal-link' to='/repos/github'>{'\u2190'} Repositories List</Link>
                <div className='loading-icon'></div>
            </Card>
        );
    }
    else{

        // If the GitHub commits result has been retrieved by the API, i.e. has finished loading,
        // then we return the list of commit messages.
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
                    <h1>GitHub Commits</h1>
                    <Link className='internal-link' to='/repos/github'>{'\u2190'} Repositories List</Link>
                    <h3 className='secondary-heading'>{selectedRepoName}</h3>
                    <ol>{commitsMessages}</ol>
                </div>
            </Card>
        );
    }
    
}