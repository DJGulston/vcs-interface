import React from 'react';
import {InputAlert} from './InputAlert.js';
import {GitHubUserNotFoundAlert} from './GitHubUserNotFoundAlert.js';
import {GitLabUserNotFoundAlert} from './GitLabUserNotFoundAlert.js';
import {GitHubUserDetails} from './GitHubUserDetails.js';
import {GitLabUserDetails} from './GitLabUserDetails.js';
import {GitHubServerError} from './GitHubServerError.js';
import {GitLabServerError} from './GitLabServerError.js';
import {Card} from 'react-bootstrap';

/**
 * Component that allows the user to search GitHub and GitLab for a particular username.
 * @param {*} props 
 * @returns 
 */
export function UserSearch(props) {

    // Properties obtained for the UserSearch component.
    let searchHasInput = props.searchHasInput;
    let username = props.username;
    let gitHubUserRetrieved = props.gitHubUserRetrieved;
    let gitHubUserResult = props.gitHubUserResult;
    let gitLabUserRetrieved = props.gitLabUserRetrieved;
    let gitLabUserResult = props.gitLabUserResult;
    let gitHubLoading = props.gitHubLoading;
    let gitLabLoading = props.gitLabLoading;
    let gitHubUserFound = props.gitHubUserFound;
    let gitLabUserFound = props.gitLabUserFound;
    let isGitHubJsonResponse = props.isGitHubJsonResponse;
    let isGitLabJsonResponse = props.isGitLabJsonResponse;

    // Group of functions below that set several states in the App component.

    function setIsGitHubJsonResponse(isGitHubJsonResponse) {
        props.setIsGitHubJsonResponse(isGitHubJsonResponse);
    }

    function setIsGitLabJsonResponse(isGitLabJsonResponse) {
        props.setIsGitLabJsonResponse(isGitLabJsonResponse);
    }

    function setGitLabReposLoading(gitLabReposLoading) {
        props.setGitLabReposLoading(gitLabReposLoading);
    }

    function setGitHubReposLoading(gitHubReposLoading) {
        props.setGitHubReposLoading(gitHubReposLoading);
    }

    function setGitLabReposResult(gitLabReposResult) {
        props.setGitLabReposResult(gitLabReposResult);
    }

    function setGitHubReposResult(gitHubReposResult) {
        props.setGitHubReposResult(gitHubReposResult);
    }

    function setGitHubUserFound(gitHubUserFound) {
        props.setGitHubUserFound(gitHubUserFound);
    }

    function setGitLabUserFound(gitLabUserFound) {
        props.setGitLabUserFound(gitLabUserFound);
    }

    function setGitHubLoading(gitHubLoading) {
        props.setGitHubLoading(gitHubLoading);
    }

    function setGitLabLoading(gitLabLoading) {
        props.setGitLabLoading(gitLabLoading);
    }

    function setSearchHasInput(searchHasInput) {
        props.setSearchHasInput(searchHasInput);
    }

    function setUsername(username) {
        props.setUsername(username);
    }

    function setGitHubUserRetrieved(gitHubUserRetrieved) {
        props.setGitHubUserRetrieved(gitHubUserRetrieved);
    }

    function setGitHubUserResult(gitHubUserResult) {
        props.setGitHubUserResult(gitHubUserResult);
    }

    function setGitLabUserRetrieved(gitLabUserRetrieved) {
        props.setGitLabUserRetrieved(gitLabUserRetrieved);
    }

    function setGitLabUserResult(gitLabUserResult) {
        props.setGitLabUserResult(gitLabUserResult);
    }

    /**
     * Function that sends multiple GET requests to the backend server. This function
     * retrieves GitHub and GitLab user information and repository information from the
     * backend server.
     */
    function searchUser() {

        // GitHub and GitLab user found states set to true by default upon searching
        // for a user.
        setGitHubUserFound(true);
        setGitLabUserFound(true);

        // Username obtained from user input.
        const newUsername = document.getElementById('username').value;

        if(newUsername === "") {

            // If the user did not type in a username, we set the
            // searchHasInput state to false.
            setSearchHasInput(false);
        }
        else {

            // If the user has typed in a username, we proceed to search for the username in GitHub
            // and GitLab.

            // GitHub and GitLab users loading boolean states set to true.
            setGitHubLoading(true);
            setGitLabLoading(true);

            // We set the searchHasInput state to true.
            setSearchHasInput(true);

            // We set the username state.
            setUsername(newUsername);
            
            // We set the GitHub and GitLab user retrieved boolean states to false by default.
            setGitHubUserRetrieved(false);
            setGitLabUserRetrieved(false);

            // We set the GitHub and GitLab repos loading boolean states to true.
            setGitHubReposLoading(true);
            setGitLabReposLoading(true);

            // GET request sent to the GitHub Users API to retrieve the user information.
            fetch(`/api/github/${newUsername}`, {method: 'GET'})
            .then((result) => result.json())
            .then(
                (result) => {

                    // If the result has a 'login' property, that means we have successfully
                    // retrieved user information.
                    if(result.hasOwnProperty('login')) {

                        // We set the GitHub user retrieved boolean state to true, and we set
                        // the GitHub user result.
                        setGitHubUserRetrieved(true);
                        setGitHubUserResult(result);
                    }
                    else {

                        // If the result does not have a 'login' property, that means we have not
                        // found information for that user in GitHub, and thus, we set the GitHub
                        // user found boolean state to false.
                        setGitHubUserFound(false);
                    }

                    // At the end of the fetch API function, we set the GitHub users loading boolean
                    // state to false, since we are done retrieving the user information.
                    setGitHubLoading(false);
                },

                (error) => {

                    // If a JSON response could be retrieved from the server, we print an error
                    // message to the console, as well as set the isGitHubJsonResponse and gitHubLoading
                    // boolean states to false.
                    console.error(error);
                    setIsGitHubJsonResponse(false);
                    setGitHubLoading(false);
                }
            );

            // GET request sent to the GitHub Repositories API to retrieve the list of repos
            // for a particular searched user.
            fetch(`/api/github/${newUsername}/repos`, {method: 'GET'})
            .then(result => result.json())
            .then(
                (result) => {

                    // Sets the GitHub repos list result, and sets the GitHub repos loading boolean
                    // state to false since we have already retrieved the repos result.
                    setGitHubReposResult(result);
                    setGitHubReposLoading(false);
                },

                (error) => {

                    // If a JSON response could be retrieved from the server, we print an error
                    // message to the console, as well as set the isGitHubJsonResponse and gitHubReposLoading
                    // boolean states to false.
                    console.error(error);
                    setIsGitHubJsonResponse(false);
                    setGitHubReposLoading(false);
                }
            );

            // GET request sent to the GitLab Users API to retrieve the user information.
            fetch(`/api/gitlab/${newUsername}`, {method: 'GET'})
            .then((result) => result.json())
            .then(
                (result) => {

                    // If the result is an array with 1 or more elements, we retrieve the user information
                    // result.
                    if(Array.isArray(result) && result.length >= 1) {

                        // If the result has an 'id' property, that means we have successfully
                        // retrieved user information.
                        if(result[0].hasOwnProperty('id')) {

                            // We set the GitHub user retrieved boolean state to true, and we set
                            // the GitLab user result.
                            setGitLabUserRetrieved(true);
                            setGitLabUserResult(result[0]);
                        }
                    }
                    else {

                        // If the result is not an array with 1 or more elements, that means we have not
                        // found information for that user in GitLab, and thus, we set the GitLab
                        // user found boolean state to false.
                        setGitLabUserFound(false);
                    }

                    // At the end of the fetch API function, we set the GitLab users loading boolean
                    // state to false, since we are done retrieving the user information.
                    setGitLabLoading(false);
                },

                (error) => {

                    // If a JSON response could be retrieved from the server, we print an error
                    // message to the console, as well as set the isGitLabJsonResponse and gitLabLoading
                    // boolean states to false.
                    console.error(error);
                    setIsGitLabJsonResponse(false);
                    setGitLabLoading(false);
                }
            );

            // GET request sent to the GitLab Repositories API to retrieve the list of repos
            // for a particular searched user.
            fetch(`/api/gitlab/${newUsername}/repos`, {method: 'GET'})
            .then(result => result.json())
            .then(
                (result) => {

                    // Sets the GitLab repos list result, and sets the GitLab repos loading boolean
                    // state to false since we have already retrieved the repos result.
                    setGitLabReposResult(result);
                    setGitLabReposLoading(false);
                },

                (error) => {

                    // If a JSON response could be retrieved from the server, we print an error
                    // message to the console, as well as set the isGitLabJsonResponse and gitLabReposLoading
                    // boolean states to false.
                    console.error(error);
                    setIsGitLabJsonResponse(false);
                    setGitLabReposLoading(false);
                }
            );
        }
    }

    return(

        <Card style={{
            margin:'40px auto',
            padding:'30px',
            width:'75%',
            border:'1px solid rgb(100, 100, 100)',
            borderRadius:'25px',
            backgroundColor:'rgb(50, 50, 50)'
        }}>

            <h1 className='page-heading'>Search</h1>

            <div className='search-block'>

                {/* Input field that allows the user to type in the username they wish to search. */}
                <div className='form-block'>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input id="username" name="username" className="form-input" type="text" placeholder="Search for username..." />
                </div>
                
                {/* Component that displays an error message if the user does not type in a username. */}
                <InputAlert searchHasInput={searchHasInput} setSearchHasInput={setSearchHasInput} />

                {/* Component that displays an error message if the username was not found on GitHub. */}
                <GitHubUserNotFoundAlert username={username} gitHubUserFound={gitHubUserFound} setGitHubUserFound={setGitHubUserFound} />

                {/* Component that displays an error message if the username was not found on GitLab. */}
                <GitLabUserNotFoundAlert username={username} gitLabUserFound={gitLabUserFound} setGitLabUserFound={setGitLabUserFound} />

                {/* Component that displays an error message if a JSON response could not be retrieved from GitHub. */}
                <GitHubServerError isGitHubJsonResponse={isGitHubJsonResponse} setIsGitHubJsonResponse={setIsGitHubJsonResponse} />

                {/* Component that displays an error message if a JSON response could not be retrieved from GitLab. */}
                <GitLabServerError isGitLabJsonResponse={isGitLabJsonResponse} setIsGitLabJsonResponse={setIsGitLabJsonResponse} />

                {/* Button that retrieves user and repo results when clicked on by the user. */}
                <div className='form-block'>
                    <div className="form-label"></div>
                    <span className="form-input">
                        <button onClick={searchUser}>Search</button>
                    </span>
                </div>
                
            </div>

            {/* Displays the GitHub and GitLab user details once the information has been retrieved from the GitHub and GitLab APIs. */}
            <div className='user-list'>
                <GitHubUserDetails result={gitHubUserResult} dataRetrieved={gitHubUserRetrieved} gitHubLoading={gitHubLoading} />
                <GitLabUserDetails result={gitLabUserResult} dataRetrieved={gitLabUserRetrieved} gitLabLoading={gitLabLoading} />
            </div>
        </Card>

        
    );
}