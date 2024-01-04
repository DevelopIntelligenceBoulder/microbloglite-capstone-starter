"use strict";
//getting the input elements to send to the api
const userNameInput = document.getElementById('username');
const fullNameInput = document.getElementById('fullName');
const passwordInput = document.getElementById('password');
const newUserBtn = document.getElementById('newUser');

window.onload = init;

//onclick function
function init() {
    newUserBtn.onclick = newUserBtnClicked;
}
//prepping values to be sent to the API
function newUserBtnClicked() {
    const newUserData = {
        username: userNameInput.value,
        fullName: fullNameInput.value,
        password: passwordInput.value,
    };

    // Make a request to the server to register the new user using post
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })
    // Store the token generated in the local storage and Redirect to the landing page
    .then(response => response.json())
    .then(data => {

        const userToken = data.token;
        localStorage.setItem("userToken", userToken);
        window.location.replace('/landing/landing.html');
    })   
    // error contingency
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
     
    });
}
