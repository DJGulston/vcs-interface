import React from 'react';

/**
 * Component that displays an error message if a username has not been found on GitLab.
 * @param {*} props 
 * @returns 
 */
export function GitLabUserNotFoundAlert(props) {

    // GitLab user found boolean state and username obtained.
    const gitLabUserFound = props.gitLabUserFound;
    const username = props.username;

    /**
     * Sets the state of the GitLab user found boolean state.
     */
    function setGitLabUserFound() {
        props.setGitLabUserFound(true);
    }

    // If the user is not found on GitLab, we display an error message.
    if(!gitLabUserFound) {
        return(
            <div className='form-block'>
                <div className="form-label"></div>
                <div className='form-input'>
                    <div className="input-alert">
                        <div>ERROR:<br/>Username "{username}" Not Found on GitLab</div>
                        <span className="close-x" onClick={setGitLabUserFound}>{'\u2715'}</span>
                    </div>
                </div>
            </div>
        );
    }
}