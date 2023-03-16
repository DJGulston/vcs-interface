import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import React from 'react';

/**
 * Component that displays a list of GitLab commit messages for a particular repository.
 * @param {*} props 
 * @returns 
 */
export function GitLabCommits(props) {

    // Obtains the GitLab commits loading boolean state, the commits result and the selected repo name.
    const commitsLoading = props.gitLabCommitsLoading;
    const commitsResult = props.gitLabCommitsResult;
    const selectedRepoName = props.selectedGitLabRepoName;

    // Maps the GitLab commits JSON result to a list of commit messages.
    const commitsMessages = commitsResult.map((commitRes) => 
        <div key={commitRes.id} className='commit-message'>
            <li><b>{new Date(Date.parse(commitRes.committed_date)).toDateString()}</b></li>
            <p><span className='commit-message-label'>{'\u2192'} Message:</span> "{commitRes.message}"</p>
        </div>
    );

    // If the GitLab commits result has not yet been retrieved by the API, i.e. still loading,
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
                <h1>GitLab Commits</h1>
                <Link className='internal-link' to='/repos/gitlab'>{'\u2190'} Repositories List</Link>
                <div className='loading-icon'></div>
            </Card>
        );
    }
    else {

        // If the GitLab commits result has been retrieved by the API, i.e. has finished loading,
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
                    <h1>GitLab Commits</h1>
                    <Link className='internal-link' to='/repos/gitlab'>{'\u2190'} Repositories List</Link>
                    <h3 className='secondary-heading'>{selectedRepoName}</h3>
                    <ol>{commitsMessages}</ol>
                </div>
            </Card>
        );
    }
    
    
}