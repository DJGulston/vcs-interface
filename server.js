const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('config');

// Importing the 'node-fetch' library to enable us to use the fetch API
// functionality in NodeJS.
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

// Enables us to pass parameters in the body of our HTTP requests.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Functions from the 'helmet' library that improve the security of our
// backend server by setting certain headers in our HTTP requests.
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// Port number on which the server will run is obtained from the
// .env file or the default.json file in the config folder.
const PORT = process.env.PORT || config.get('server.port');

/**
 * Get request that obtains a username parameter and sends that
 * parameter to the GitHub API to retrieve the user's GitHub information.
 */
app.get('/api/github/:username', (request, response) => {

    // Obtains username parameter.
    const username = request.params.username;

    // GET request sent to the GitHub Users API to retrieve user information.
    fetch(`https://api.github.com/users/${username}`, {method: 'GET'})
    .then(result => result.json())
    .then(
        (result) => {

            // If the result has a 'message' property, that means the username
            // was NOT found, and thus, we print a message to the console indicating
            // that we could not find the user.
            if(result.hasOwnProperty('message')) {
                console.log('Message: "' + username + '" ' + result.message);
            }

            // Result is sent back to client regardless of whether the user was
            // found or not.
            response.send(result);
        }
    )
    .catch(
        (error) => {

            // If some other kind of error occurs, an error is printed to the console.
            console.error(error);
        }
    );
});

/**
 * Get request that obtains a username parameter and sends that parameter to the GitHub
 * Repositories API to retrieve a list of repositories for that username.
 */
app.get('/api/github/:username/repos', (request, response) => {

    // Username name parameter obtained.
    const username = request.params.username;

    // GET request sent to the GitHub Repositories API to retrieve the list
    // of repositories for a particular user.
    fetch(`https://api.github.com/users/${username}/repos`, {method: 'GET'})
    .then(result => result.json())
    .then(
        (result) => {

            // Sends array of repositories to the client.
            response.send(result);
        }
    )
    .catch(
        (error) => {

            // Error printed to console if some arbitrary error occurs.
            console.error(error);
        }
    );
});

/**
 * Get request that obtains username and repository name parameters and sends those parameters
 * to the GitHub Commits API to retrieve 5 of the most recent commits for a particular
 * repository.
 */
app.get('/api/github/:username/:repo/commits', (request, response) => {

    // Username and repository name parameters obtained.
    const username = request.params.username;
    const repo = request.params.repo;

    // GET request sent to the GitHub Commits API to retrieve 5 of the most recent
    // commits for a particular repository.
    fetch(`https://api.github.com/repos/${username}/${repo}/commits`, {method: 'GET'})
    .then(result => result.json())
    .then(
        (result) => {

            // If the result has a 'message' property, that means no commits were found,
            // and thus, we send back an empty array to the client.
            if(result.hasOwnProperty('message')) {
                response.send([]);
            }
            else {

                // Keeps track of the indices of the 5 most recent commits.
                let datesIndices = [];

                // Stores the 5 most recent commits.
                let latestCommits = [];

                // We iterate 5 times because we need to find the 5 most recent commits.
                for(let i = 0; i < 5; i++) {

                    // We set a very old date as our default most recent commit date.
                    // This is our current latest date.
                    let latestDate = Date.parse('1990-01-01');

                    // We set -1 as the default index of our most recent commit date.
                    let latestDateIndex = -1;
                    
                    // We iterate through all the commits to find the most recent commit
                    // date.
                    for(let j = 0; j < result.length; j++) {

                        // Obtains the date of the current commit.
                        let currentDate = Date.parse(result[j].commit.committer.date);

                        // If the index of this commit has already been added to the datesIndices
                        // array, this means that this commit is already 1 of the 5 most recent
                        // commits, and thus, we must skip it, otherwise, this commit will be added
                        // again to the list of most recent commits.
                        if(!datesIndices.includes(j)) {

                            // If the current date is more recent than the current latest date, then
                            // we set the current date as our new latest date and we set index j as
                            // our new latest date index.
                            if(latestDate < currentDate) {
                                latestDate = currentDate;
                                latestDateIndex = j;
                            }
                        }
                    }

                    // If the latest date index IS -1, that means we have not found a latest date.
                    // However, if the latest date index is NOT -1, that means we have found a latest
                    // date, and thus, we add the commit located at the latest date index to the
                    // latest commits array, as well as the latest date index to the datesIndices array.
                    if(latestDateIndex != -1) {
                        latestCommits.push(result[latestDateIndex]);
                        datesIndices.push(latestDateIndex);
                    }
                }

                // Sends array of latest commits to the client.
                response.send(latestCommits);

            }
        }
    )
    .catch(
        (error) => {

            // Error printed to the console if some arbitrary error occurs.
            console.error(error);
        }
    );

});

/**
 * Get request that obtains a username parameter and sends that parameter to the GitLab API
 * to retrieve GitLab user information for that particular username.
 */
app.get('/api/gitlab/:username', (request, response) => {

    // Username parameter obtained.
    const username = request.params.username;
    
    // GET request sent to the GitLab API to retrieve user information for a particular user.
    fetch(`https://gitlab.com/api/v4/users?username=${username}`, {method: 'GET'})
    .then(result => result.json())
    .then(
        (result) => {

            // User information sent back to the client.
            response.send(result);
        }
    )
    .catch(
        (error) => {

            // Error printed to the console if some arbitrary error occurs.
            console.error(error);
        }
    );

});

/**
 * Get request that obtains a username parameter and sends that parameter to the
 * GitLab Projects API to retrieve a list of repositories for that particular
 * username.
 */
app.get('/api/gitlab/:username/repos', (request, response) => {

    // Username parameter obtained.
    const username = request.params.username;
    
    // GET request sent to the GitLab Projects API to retrieve a list of repositories
    // for a particular username.
    fetch(`https://gitlab.com/api/v4/users/${username}/projects`, {method: 'GET'})
    .then(result => result.json())
    .then(
        (result) => {

            // Array of repositories sent back to the client.
            response.send(result);
        }
    )
    .catch(
        (error) => {

            // Error printed to the console if some arbitrary error occurs.
            console.error(error);
        }
    );

});

/**
 * Get request that obtains a repository ID parameter and sends that parameter
 * to the GitLab Commits API to retrieve 5 of the most recent commits for that
 * particular repository.
 */
app.get('/api/gitlab/:id/commits', (request, response) => {

    // Username and repository name parameters obtained.
    const project_id = request.params.id;
    
    // GET request sent to the GitLab Commits API to retrieve 5 of the most recent
    // commits for a particular repository.
    fetch(`https://gitlab.com/api/v4/projects/${project_id}/repository/commits`, {method: 'GET'})
    .then(result => result.json())
    .then(
        (result) => {

            // If the result is an array and has 1 or more elements we search for the 5 most recent
            // commits.
            if(Array.isArray(result) && result.length >= 1) {

                // If the result at index 0 has a 'committed_date' property, then we search for the
                // 5 most recent commits.
                if(result[0].hasOwnProperty('committed_date')) {

                    // Keeps track of the indices of the 5 most recent commits.
                    let datesIndices = [];
    
                    // Stores the 5 most recent commits.
                    let latestCommits = [];
    
                    // We iterate 5 times because we need to find the 5 most recent commits.
                    for(let i = 0; i < 5; i++) {
    
                        // We set a very old date as our default most recent commit date.
                        // This is our current latest date.
                        let latestDate = Date.parse('1990-01-01');

                        // We set -1 as the default index of our most recent commit date.
                        let latestDateIndex = -1;
                        
                        // We iterate through all the commits to find the most recent commit
                        // date.
                        for(let j = 0; j < result.length; j++) {

                            // Obtains the date of the current commit.
                            let currentDate = Date.parse(result[j].committed_date);
    
                            // If the index of this commit has already been added to the datesIndices
                            // array, this means that this commit is already 1 of the 5 most recent
                            // commits, and thus, we must skip it, otherwise, this commit will be added
                            // again to the list of most recent commits.
                            if(!datesIndices.includes(j)) {

                                // If the current date is more recent than the current latest date, then
                                // we set the current date as our new latest date and we set index j as
                                // our new latest date index.
                                if(latestDate < currentDate) {
                                    latestDate = currentDate;
                                    latestDateIndex = j;
                                }
                            }
                        }
    
                        // If the latest date index IS -1, that means we have not found a latest date.
                        // However, if the latest date index is NOT -1, that means we have found a latest
                        // date, and thus, we add the commit located at the latest date index to the
                        // latest commits array, as well as the latest date index to the datesIndices array.
                        if(latestDateIndex != -1) {
                            latestCommits.push(result[latestDateIndex]);
                            datesIndices.push(latestDateIndex);
                        }
                    }

                    // Sends array of latest commits to the client.
                    response.send(latestCommits);
    
                }
            }
            else {

                // If the result is not an array or is an array with a length of 0 elements, then we
                // send the result as is to the client.
                response.send(result);
            }

        }
    )
    .catch(
        (error) => {

            // Error printed to the console if some arbitrary error occurs.
            console.error(error);
        }
    );

});

/**
 * Sets the server to listen on its assigned PORT number.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/*

References:

How to call APIs in Express via node-fetch:
- https://rapidapi.com/guides/call-apis-in-express-via-node-fetch

How to create a date from a string:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse

How to convert Unix timestamp to Date in JavaScript:
- https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

Check if element exist in an array:
- https://www.w3schools.com/jsref/jsref_includes_array.asp

How to test asynchronous code with Mocha:
- https://masteringjs.io/tutorials/mocha/async

 */