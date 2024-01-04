'use strict'

const apiBaseURL = "https://microbloglite.onrender.com";

function signUp(signUpData) {
        //POST create user
        const options = { 
            method: "POST",
            headers: {
                // This header specifies the type of content we're sending.
                // This is required for endpoints expecting us to send
                // JSON data.
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData),
        };
        
        return fetch(apiBaseURL + '/api/users', options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in sign up");
            }

            window.location.assign("login.html");
                // redirect
                console.log(signUp);
                return signUp;
            });

            return response.json();
        }
    

document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    // retrieve username and password from the form
    const signUpData = {
        username: document.getElementById("username").value,
        fullName: document.getElementById("firstName").value + ' ' + document.getElementById("lastName").value,
        password: document.getElementById("password").value
    };
    // make an API request to create the account
    signUp(signUpData);

    // clear the form 
    document.getElementById("registrationForm").reset();
});