"use strict";
//variables
const loginForm = document.getElementById("login");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const submitBtn = document.getElementById("submitBtn");


submitBtn.onclick = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginUsername.value,
        password: loginPassword.value,
    };

    // Disables the button after the form has been submitted already:
    // loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    let loginResult = login(loginData);
    console.log(loginResult);

    
};
