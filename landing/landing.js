"use strict";
//submit button element and login query
const loginButton = document.getElementById("loginButton")
const loginForm = document.querySelector("#login");

window.onload = init;
//initializing onclick event and setting a variable
function init() {
    loginButton.onclick = loginButtonClicked;
}
//using function to set inputs as logindata constant
function loginButtonClicked() {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const loginData = {
        username: usernameField.value,
        password: passwordField.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    //process the login using the function from auth.js!
    login(loginData);
}

//pulling logindata from local storage
function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


// boolean to see if token is in logindata
function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// information being sent through post method to api auth/login
function login(loginData) {
 
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),

    };
//saving response to local storage and redirect to post using fetch function
    return fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            console.log("loginsuccessful:",loginData)
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("/posts");

            return loginData;
        });
}