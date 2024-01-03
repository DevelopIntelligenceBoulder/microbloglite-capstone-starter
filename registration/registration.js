"use strict";

const fullNameInput = document.getElementById('fullName');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const bioTextInput = document.getElementById('bioText');
const newUserBtn = document.getElementById('newUser');

window.onload = init;

function init() {
    newUserBtn.onclick = newUserBtnClicked;
}

function newUserBtnClicked() {
    const newUserData = {
        fullName: fullNameInput.value,
        username: userNameInput.value,
        password: passwordInput.value,
        bioText: bioTextInput.value
    };

    // Make a request to the server to register the new user
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })
    .then(response => response.json())
    .then(data => {

        const userToken = data.token;

        // Store the token in the local storage
        localStorage.setItem("userToken", userToken);

        // Redirect to the landing page to login
        window.location.replace('/landing/landing.html');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle the error appropriately
    });
}
