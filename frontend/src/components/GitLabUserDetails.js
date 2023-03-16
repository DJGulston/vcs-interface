import {Link} from 'react-router-dom';
import React from 'react';

/**
 * Component that displays the GitLab user details for a particular username.
 * @param {*} props 
 * @returns 
 */
export function GitLabUserDetails(props) {

    // Determines whether the GitLab user details have been retrieved.
    const dataRetrieved = props.dataRetrieved;

    // Determines whether the GitLab user details are still loading.
    const gitLabLoading = props.gitLabLoading;
    
    if(gitLabLoading) {

        // If the GitLab user details are still being retrieved, i.e. still loading,
        // then we display the loading icon.
        return(
            <div className='loading-icon'></div>
        );
    }
    else if(dataRetrieved) {

        // Obtains the user details from the API JSON results.
        const username = props.result.username;
        const name = props.result.name;
        const userState = props.result.state;
        const profilePicture = props.result.avatar_url;
        const profileLink = props.result.web_url;

        // If the GitLab user details have been retrieved from the API, we display these details.
        return(
            <div className='user-section'>
                <img className='avatar-img' src={profilePicture} alt='GitLab Avatar' />
                <h3><a href={profileLink} target='_blank' rel='noreferrer' className='external-link'>{username}</a></h3>
                <p><b>Full Name:</b> {name}</p>
                <p><b>Profile State:</b> {userState}</p>
                <p><b>VCS Profile Type:</b> GitLab</p>

                {/* Link that allows us to view the user's GitLab repositories. */}
                <Link className='internal-link' to='/repos/gitlab'>View Repos {'\u2192'}</Link>    
            </div>
        );
    }
}