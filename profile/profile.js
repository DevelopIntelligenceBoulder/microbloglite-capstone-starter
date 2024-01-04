"use strict";

const logoutButton = document.getElementById("logoutButton");
const popupTextbox = document.getElementById("popupTextbox");
const recipeButton = document.getElementById("recipe");

// const createPost = document.getElementById("createPost");
// const usernameDisplay = document.getElementById("usernameDisplay");
// let userToken = userJSON.token;

window.onload = init;

function init() {
    logoutButton.onclick = logoutButtonClicked;
    recipeButton.onsubmit = recipeButtonClicked;
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

    fetch("http://http//microbloglite.us-east-2.elasticbeanstalk.com/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using finally() so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/landing/landing.html");  // redirect back to landing page
        });
}

function getLoginData() {
    const userJSON = window.localStorage.getItem("username");
    return JSON.parse(userJSON);
}

function createPost() {


    const options = {
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: popupTextbox }),

    };

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)

        .then(response => response.json())
        .then(info => {

            console.log("Post created successfully", info);

            const postInfo = info._id;

            // Store the token in the local storage
            localStorage.setItem("postInfo", postInfo);

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle the error appropriately
        });
}



function displayUsername(posts) {
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
function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON);
}


// You can use this function to see whether the current visitor is
// logged in. It returns either true or false.
function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}

function displayUsername(username) {
    usernameDisplayContainer.innerHTML = userJSON.value;
    userJSON.stringify(username)
}

function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}

function recipeButtonClicked() {
    const textBox = {
        popupTextbox: popupTextbox.value,
    }
}


function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON);
}


// You can use this function to see whether the current visitor is
// logged in. It returns either true or false.
function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other fetch() requests
// you may need to write.
function login(loginData) {
    // POST /auth/login
    const options = {
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),

    };
}