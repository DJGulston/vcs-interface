import React from 'react';

/**
 * Component that displays an error message if the client could not retrieve a JSON response
 * from the GitHub server.
 * @param {*} props 
 * @returns 
 */
export function GitHubServerError(props) {

    // GitHub JSON response boolean state obtained.
    const isJsonResponse = props.isGitHubJsonResponse;

    /**
     * Sets the state of the GitHub JSON response boolean state.
     */
    function setIsGitHubJsonResponse() {
        props.setIsGitHubJsonResponse(true);
    }

    // If the user is not found on GitHub, we display an error message.
    if(!isJsonResponse) {
        return(
            <div className='form-block'>
                <div className="form-label"></div>
                <div className='form-input'>
                    <div className="input-alert">
                        <div>ERROR:<br/>Could not retrieve JSON response from GitHub</div>
                        <span className="close-x" onClick={setIsGitHubJsonResponse}>{'\u2715'}</span>
                    </div>
                </div>
            </div>
        );
    }
}