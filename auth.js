/* auth.js provides LOGIN-related functions */

"use strict";
//api that we will call upon
const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

//pulling our login data from our local storage
function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


// this function is to see whether the current visitor is logged in. It returns either `true` or `false` using a boolean.
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// post method to auth/login with specified content type
function login (loginData) {
    const options = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };
// redirect to landing page
    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("/posts");  

            return loginData;
        });
}


// initiating the logout function
function logout () {
    const loginData = getLoginData();

    // GET method 
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the api
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            //finally completes logout no matter the response

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}