const expect = require('chai').expect;
const request = require('request');

// Axios library that allows us to test async code.
const axios = require('axios');

function get(url, cb) {
  return axios.get(url);
}

describe('Status and content', () => {

    describe('GitLab Repositories Page', () => {

        // The username we are using to test the GitLab Repositories page.
        const testUsername = 'DJGulston';

        // The JSON object we expect to retrieve from the server's GitLab Repos page.
        const expectedJson = [
            {
                "id": 44210935,
                "description": null,
                "name": "Hangman ReactJS",
                "name_with_namespace": "Dean Gulston / Hangman ReactJS",
                "path": "hangman-reactjs",
                "path_with_namespace": "DJGulston/hangman-reactjs",
                "created_at": "2023-03-10T12:43:26.007Z",
                "default_branch": "master",
                "tag_list": [],
                "topics": [],
                "ssh_url_to_repo": "git@gitlab.com:DJGulston/hangman-reactjs.git",
                "http_url_to_repo": "https://gitlab.com/DJGulston/hangman-reactjs.git",
                "web_url": "https://gitlab.com/DJGulston/hangman-reactjs",
                "readme_url": "https://gitlab.com/DJGulston/hangman-reactjs/-/blob/master/README.md",
                "forks_count": 0,
                "avatar_url": null,
                "star_count": 0,
                "last_activity_at": "2023-03-10T12:43:26.007Z",
                "namespace": {
                    "id": 64781461,
                    "name": "Dean Gulston",
                    "path": "DJGulston",
                    "kind": "user",
                    "full_path": "DJGulston",
                    "parent_id": null,
                    "avatar_url": "https://secure.gravatar.com/avatar/cfee38cfa7b2f45d0cdf1fea644a3f41?s=80&d=identicon",
                    "web_url": "https://gitlab.com/DJGulston"
                }
            }
        ];

        // The stringified JSON object we expect to see in the body.
        const expectedBody = JSON.stringify(expectedJson);

        // Checks to see if a GET request sent to our server's GitLab Repos API page will return
        // an OK 200 response.
        it('Returns an HTTP OK 200 response.', (done) => {

            // Get request sent to our server's GitLab Repos API page.
            request(`http://localhost:8080/api/gitlab/${testUsername}/repos`, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });

        });

        // Checks to see if a GET request sent to our server's GitLab Repos API page will return
        // the correct JSON object as its body content.
        it('Correct JSON object is rendered in the body.', (done) => {

            // Get request sent to our server's GitLab Repos API.
            request(`http://localhost:8080/api/gitlab/${testUsername}/repos`, (error, response, body) => {
                expect(body).to.equal(expectedBody);
                done();
            });

        });

        it('GitLab Projects API returns the correct ID for the repository at index 0.', (done) => {
            
            // Get request sent to the GitLab Projects API.
            get(`https://gitlab.com/api/v4/users/${testUsername}/projects`)
            .then(res => {

                // Repo ID obtained from the GitLab Projects API response.
                const actualRepoId = res.data[0].id;

                // The repo ID we expect to get.
                const expectedRepoId = 44210935;
                
                expect(actualRepoId).to.equal(expectedRepoId);
                
                // If no parameters were passed to the done() function, then the test has run successfully.
                done();
            })
            // If parameters were pass to the done() function, then an error has occurred.
            .catch(err => done(err));
        });

    });

});

/*

References:

How to test asynchronous code with Mocha:
- https://masteringjs.io/tutorials/mocha/async

*/