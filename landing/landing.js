/* Landing Page JavaScript */

"use strict";

//login API
//const apiBaseURL = "microbloglite.us-east-2.elasticbeanstalk.com";

const loginButton = document.getElementById("loginButton")
const loginForm = document.querySelector("#login");

window.onload = init;

function init() {
    loginButton.onclick = loginButtonClicked;
}

function loginButtonClicked() {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const loginData = {
        username: usernameField.value,
        password: passwordField.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
}


function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
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

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            console.log("loginsuccessful:",loginData)
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("/posts");  // redirect

            return loginData;
        });
}