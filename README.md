# VCS Interface

A full stack Version Control System web application that allows a user to search for a username on GitHub and GitLab and retrieve user, repository and commit details associated with that username.

---

## Table Of Contents

1. How to install the application
2. How to run the application
3. How to use the application
4. Credit to authors

---

## How to install the application

Before you can use this application, you must ensure that you have installed all the necessary software on your machine.

In order to run the Express.js server and the frontend React.js web application, you will have to install Node.js on your machine. You can download Node.js [here](https://nodejs.org/en/download). It is recommended that you download the LTS (Long Term Support) version of Node.js. The Node Package Manager (npm) is automatically installed with Node.js.

While downloading Node.js, ensure that you download all the files for the VCS Interface from GitHub and save them in an ideal location on your machine.

Once Node.js is downloaded and installed on your machine, you will have to install all the dependencies for the backend server and frontend web application. To do this, open up a command line interface and navigate to the root directory of the project. Once you are there, type in the following command:

- npm install

This command will download all the dependencies for the backend server. If the dependencies are successfully installed, a node_modules directory should now be visible in the root directory of the project.

Next, we have to install all dependencies for the frontend web application. We do this by opening up the command line interface again and navigating to the frontend directory of the project. Once there, we type in the same command as before:

- npm install

This should download all the dependencies for the frontend web application. If the installation is successful, a node_modules directory should now be visible in the frontend directory.

We are now ready to run the entire VCS Interface.

---

## How to run the application

To run this application, we have to open up to command line interfaces. For the first command line interface, we navigate to the root directory of the project and type in the following command:

- npm start

This command will start up the backend server.

For the second command line interface, we navigate to the frontend directory of the project and type in the same command as before:

- npm start

This should start up the frontend web application. Once the frontend web application is fully running, we should see the VCS Interface in your browser.

We are now ready to use the VCS Interface.

---

## How to use the application

To use this application, you may search for a username in the search bar. Simply type in your chosen username and click on the Search button.

If the username does not exist in GitHub or GitLab, or if you try to search for a blank username, you should see one or more error messages popup under the search bar.

If the username does exist in GitHub and/or GitLab, you should see GitHub and/or GitLab user details displayed on the page underneath the search bar.

You may either click on the user's name and view their profile on GitHub or GitLab, or you may click on the 'View Repos' section to view all their repositories on GitHub or GitLab.

Once you are in the GitHub or GitLab Repositories page, you may either click on any of the repository names to view the repository on GitHub or GitLab, click on the 'User Details' section to navigate back to the Search page, or you may click on the 'Last 5 Commits' sections to view the 5 most recent commits for that particular repository.

Once in the GitHub or GitLab Commits page, you can view the 5 most recent commit messages for that particular repository. The user may navigate back to the Repositories page by clicking on the 'Repositories' section, or they may navigate back to the Search page by clicking on 'Search' in the navigation menu at the top of the page.

The user may click on 'Search' in the navigation menu at the top of the page any point in time to head back to the Search homepage.

---

## Credit to authors

[Dean Justin Gulston](https://github.com/DJGulston)
