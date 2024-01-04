"use strict";

const logoutButton = document.getElementById("logoutButton");
const allPostsBtn = document.getElementById("allPostsBtn");
const viewAllPostsContainer = document.getElementById("viewAllPostsContainer");

window.onload = init;

//initializing and setting variables to onclick events
function init() {
    logoutButton.onclick = logoutButtonClicked;
    allPostsBtn.onclick = allPostsBtnClicked;

}

//pulling logindata
function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

//logout redirect function
function logoutButtonClicked() {
    // Check if loginData is defined
    const loginData = getLoginData();
    if (!loginData || !loginData.token) {
        window.location.assign("/landing/landing.html");
        return;
    }

    //logout with get token authorization
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
        },
    };
    //fetching response, removing data from local storage, and then redirecting
    fetch("http://http://microbloglite.us-east-2.elasticbeanstalk.com/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {


            window.localStorage.removeItem("login-data"); 
            window.location.assign("/landing/landing.html"); 
        });
}

//initializing functions
function allPostsBtnClicked() {
    getAllPosts();
    displayPosts();
}

//using fetch to get all posts and display through api response, and logout function
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

// Display only the first 6 posts within their container 
function displayPosts(posts) {
    viewAllPostsContainer.innerHTML = "";

    
    const numOfPosts = posts.slice(0, 6);

    numOfPosts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");

        const contentParagraph = document.createElement("p");
        contentParagraph.classList.add("post-content");
        contentParagraph.innerText = post.text;

        const authorParagraph = document.createElement("p");
        authorParagraph.classList.add("post-author");
        authorParagraph.innerText = `Author: ${post.username}`;

        const timestampParagraph = document.createElement("p");
        timestampParagraph.classList.add("post-timestamp");
        timestampParagraph.innerText = `Timestamp: ${post.createdAt}`;

        postCard.appendChild(contentParagraph);
        postCard.appendChild(authorParagraph);
        postCard.appendChild(timestampParagraph);

        viewAllPostsContainer.appendChild(postCard);
    });
}

//is logged in to get data authorization
function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}
