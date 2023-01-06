"use strict";

const api = "https://microbloglite.herokuapp.com";

const form = document.querySelector('login');
uField = form.querySelector(".username"),
uInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input");
form.onsubmit = (e)=>{
    var loginData;
    loginData.username = uInput;
    loginData.password = pInput;
    e.preventDefault(); 
    login(loginData);
}

// You can use this to get the login data of the logged-in user (if any). 
// Returns either an object including the username and token,
// or an empty object if the visitor is not logged in.
function getLoginData () {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


// You can use this to see whether the current visitor is logged in. 
// Returns either `true` or `false`.
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
function login (loginData) {
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

    return fetch(api + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("./posts");  // redirect
            console.log(window.location.href);
        });
}

