import {Link} from 'react-router-dom';
import React from 'react';

/**
 * Component that displays the GitHub user details for a particular username.
 * @param {*} props 
 * @returns 
 */
export function GitHubUserDetails(props) {

    // Determines whether the GitHub user details have been retrieved.
    const dataRetrieved = props.dataRetrieved;

    // Determines whether the GitHub user details are still loading.
    const gitHubLoading = props.gitHubLoading;
    
    if(gitHubLoading) {

        // If the GitHub user details are still being retrieved, i.e. still loading,
        // then we display the loading icon.
        return(
            <div className='loading-icon'></div>
        );
    }
    else if(dataRetrieved) {

        // Obtains the user details from the API JSON results.
        const username = props.result.login;
        const name = props.result.name;
        const bio = props.result.bio;
        const profilePicture = props.result.avatar_url;
        const dateCreated = props.result.created_at;
        const lastUpdate = props.result.updated_at;
        const numberOfRepos = props.result.public_repos;
        const followers = props.result.followers;
        const following = props.result.following;
        const profileUrl = props.result.html_url;

        // If the GitHub user details have been retrieved from the API, we display these details.
        return(
            <div className='user-section'>
                <img className='avatar-img' src={profilePicture} alt='GitHub Avatar' />
                <h3><a href={profileUrl} target='_blank' rel='noreferrer' className='external-link'>{username}</a></h3>
                <p><b>Full Name:</b> {name}</p>
                <p><b>Bio:</b> {bio}</p>
                <p><b>Date created:</b> {new Date(Date.parse(dateCreated)).toDateString()}</p>
                <p><b>Last update:</b> {new Date(Date.parse(lastUpdate)).toDateString()}</p>
                <p><b>Number of repos:</b> {numberOfRepos}</p>
                <p><b>Followers:</b> {followers}</p>
                <p><b>Following:</b> {following}</p>
                <p><b>VCS Profile Type:</b> GitHub</p>

                {/* Link that allows us to view the user's GitHub repositories. */}
                <Link className='internal-link' to='/repos/github'>View Repos {'\u2192'}</Link>
            </div>
        );
    }
}