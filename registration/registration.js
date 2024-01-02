"use strict";

const registerForm = document.querySelector("#register");

registerForm.onsubmit = function (e) {
    e.preventDefault();

    // We can use loginForm.username (for example) to access the input element in the form which has the ID of "username".
    const registerData = {
        username: registerForm.username.value,
        fullName: registerForm.fullName.value,
        password: registerForm.password.value,
    }
    console.log(registerData, "trigger")

    // Disables the button after the form has been submitted already:
    registerForm.registerButton.disabled = true;

    // Process the register using the function from auth.js
    register(registerData);
};

function register (registerData) {
    // POST /api/users
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    };

    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json())
        .then(registerData => {
            window.localStorage.setItem("register-data", JSON.stringify(registerData));
            window.location.assign("index.html");  // redirect

            return registerData;
        });
};
