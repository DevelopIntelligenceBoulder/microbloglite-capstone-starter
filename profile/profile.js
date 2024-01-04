"use strict";

const logoutButton = document.getElementById("logoutButton");
const profileContainer = document.getElementById("profileContainer");
const textBoxContent = document.getElementById("textBoxContent");
const postButton = document.getElementById("postButton");

let userData;

window.onload = function () {
    logoutButton.onclick = logoutButtonClicked;
    postButton.onclick = addPost;

   fetchUserData();
}

function fetchUserData() {

    userData = getLoginData();

    if (userData.username) {
        profileContainer.querySelector('h2').innerText = userData.username;
    }

    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${userData.username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    })
    .then(res => res.json())
    .then(retrievedUserData => {
        if (retrievedUserData.bio) {
            profileContainer.querySelector('p').innerText = retrievedUserData.bio;
        }
    })
    .catch((err) => console.error('Error fetching user data:', err));
}


function addPost(event) {
    event.preventDefault();

    const infoBody = {
        text: textBoxContent.value,
    };

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST', 
        body: JSON.stringify(infoBody),

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    })
    .then(response => response.json())
    .then(createPost =>{
        console.log(createPost);
        textBoxContent.value = '';
    })
}

function getUpdatedUserData(currentUsername) {
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${currentUsername}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    })
    .then(res => res.json())
    .then(retrievedUserData => {
        console.log('Retrieved User Data:', retrievedUserData);
        handleProfileDisplay(retrievedUserData);
    })
    .catch((err) => console.error('Error fetching updated user data:', err));
}

function handleProfileDisplay(retrievedUserData) {

    const bioElement = profileContainer.querySelector("p");
    bioElement.innerText = retrievedUserData.bio;
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

    fetch("http:///microbloglite.us-east-2.elasticbeanstalk.com/auth/logout", options)
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