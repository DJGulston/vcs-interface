import React from 'react';

/**
 * Component that displays an error message if a particular username has not been found
 * on GitHub.
 * @param {*} props 
 * @returns 
 */
export function GitHubUserNotFoundAlert(props) {

    // GitHub user found boolean state and username obtained.
    const gitHubUserFound = props.gitHubUserFound;
    const username = props.username;

    /**
     * Sets the state of the GitHub user found boolean state.
     */
    function setGitHubUserFound() {
        props.setGitHubUserFound(true);
    }

    // If the user is not found on GitHub, we display an error message.
    if(!gitHubUserFound) {
        return(
            <div className='form-block'>
                <div className="form-label"></div>
                <div className='form-input'>
                    <div className="input-alert">
                        <div>ERROR:<br/>Username "{username}" Not Found on GitHub</div>
                        <span className="close-x" onClick={setGitHubUserFound}>{'\u2715'}</span>
                    </div>
                </div>
            </div>
        );
    }
}