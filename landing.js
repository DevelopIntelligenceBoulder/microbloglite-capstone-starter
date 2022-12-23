/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.usernameField.value,
        password: loginForm.passwordField.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginBtn.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};
