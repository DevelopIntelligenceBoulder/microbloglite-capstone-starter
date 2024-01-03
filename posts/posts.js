"use strict";

const postsContainer = document.getElementById("postsContainer");
const logoutButton = document.getElementById("logoutButton");
const allPostsBtn = document.getElementById("allPostsBtn");

window.onload = init;

function init() {
    logoutButton.onclick = logoutButtonClicked;
    allPostsBtn.onclick = allPostsBtnClicked;

}

function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

function logoutButtonClicked() {
    // Check if loginData is defined
    const loginData = getLoginData();
    if (!loginData || !loginData.token) {
        // Redirect to the landing page if loginData or token is missing
        window.location.assign("/landing/landing.html");
        return;
    }

    // GET /auth/logout
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
        },
    };

    fetch("http://http://microbloglite.us-east-2.elasticbeanstalk.com/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/landing/landing.html");  // redirect back to landing page
        });
}

function allPostsBtnClicked() {
    getAllPosts();
    displayPosts();
}

function getAllPosts() {
    const loginData = getLoginData();

    if (!loginData || !loginData.token) {
        // Redirect to the landing page if loginData or token is missing
        window.location.assign("/landing/landing.html");
        return;
    }

    // GET /auth/logout
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
        },
    };

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            console.error("Error loading all posts", error);
        });
}

function displayPosts(posts) {
    postsContainer.innerHTML = "";

    // Display only the first 6 posts
    const numOfPosts = posts.slice(0, 6);

    numOfPosts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        const contentParagraph = document.createElement("p");
        contentParagraph.innerText = `Content ${post.text}`;

        const authorParagraph = document.createElement("p");
        authorParagraph.innerText = `Author: ${post.username}`;

        const timestampParagraph = document.createElement("p");
        timestampParagraph.innerText = `Timestamp: ${post.createdAt}`;

        postDiv.appendChild(contentParagraph);
        postDiv.appendChild(authorParagraph);
        postDiv.appendChild(timestampParagraph);

        postsContainer.appendChild(postDiv);
    });
}

function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}
