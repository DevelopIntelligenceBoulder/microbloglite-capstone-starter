/* Registration Page JavaScript */

"use strict";

const registrationForm = document.querySelector("#registration");

registrationForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    const registrationData = {
        username: registrationForm.usernameField.value,
        password: registrationForm.passwordField.value,
        fullName: `${registrationForm.nameField.value} ${registrationForm.lastNameField.value}`,
    }

    // Disables the button after the form has been submitted already:
    registrationForm.signinBtn.disabled = true;

    register(registrationData);
};

function register(userData) {
    fetch(`https://microbloglite.herokuapp.com/api/users`, {
        method: "POST",
        body: userData
    })
    .then(result => result.json());
}