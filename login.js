"use strict";

//const apiBaseURL = "https://microbloglite.onrender.com";

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

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("profilepage.html");
            // redirect
            console.log(loginData);
            return loginData;
        });
}

document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();

    // get username and password from the form
    const loginData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    // make an API request to login
    login(loginData);
});