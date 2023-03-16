import React from 'react';

/**
 * Component that displays an error message if the client could not retrieve a JSON response
 * from the GitLab server.
 * @param {*} props 
 * @returns 
 */
export function GitLabServerError(props) {

    // GitLab JSON response boolean state obtained.
    const isJsonResponse = props.isGitLabJsonResponse;

    /**
     * Sets the state of the GitLab JSON response boolean state.
     */
    function setIsGitLabJsonResponse() {
        props.setIsGitLabJsonResponse(true);
    }

    // If the user is not found on GitLab, we display an error message.
    if(!isJsonResponse) {
        return(
            <div className='form-block'>
                <div className="form-label"></div>
                <div className='form-input'>
                    <div className="input-alert">
                        <div>ERROR:<br/>Could not retrieve JSON response from GitLab</div>
                        <span className="close-x" onClick={setIsGitLabJsonResponse}>{'\u2715'}</span>
                    </div>
                </div>
            </div>
        );
    }
}