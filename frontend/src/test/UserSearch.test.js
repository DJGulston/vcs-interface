/**
 * Unit test that checks if the fetch API function for the GitHub user details
 * successfully retrieves the correct information.
 */
test('Fetch GitHub user details works correctly.', async () => {

    // The username we are going to pass as input to the fetch API function.
    const testUsername = "DJGulston";

    // The JSON result we expect to receive from the fetch API function.
    const expectedJson = {
        "login": "DJGulston",
        "id": 89834422,
        "node_id": "MDQ6VXNlcjg5ODM0NDIy",
        "avatar_url": "https://avatars.githubusercontent.com/u/89834422?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/DJGulston",
        "html_url": "https://github.com/DJGulston",
        "followers_url": "https://api.github.com/users/DJGulston/followers",
        "following_url": "https://api.github.com/users/DJGulston/following{/other_user}",
        "gists_url": "https://api.github.com/users/DJGulston/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/DJGulston/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/DJGulston/subscriptions",
        "organizations_url": "https://api.github.com/users/DJGulston/orgs",
        "repos_url": "https://api.github.com/users/DJGulston/repos",
        "events_url": "https://api.github.com/users/DJGulston/events{/privacy}",
        "received_events_url": "https://api.github.com/users/DJGulston/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Dean Justin Gulston",
        "company": null,
        "blog": "",
        "location": "Sandton, Gauteng, South Africa.",
        "email": null,
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 15,
        "public_gists": 0,
        "followers": 0,
        "following": 0,
        "created_at": "2021-08-31T07:29:29Z",
        "updated_at": "2023-02-14T13:47:26Z"
    };
    
    // Fetch API function for the GitHub user details.
    fetch(`/api/github/${testUsername}`, {method: 'GET'})
    .then((result) => {

        const actualJson = result.json();

        expect(actualJson).toBe(expectedJson);
    });
    
});