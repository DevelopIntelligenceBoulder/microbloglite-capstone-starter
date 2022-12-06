/* Landing Page JavaScript */

"use strict";

const $q = (s) => document.querySelector(s);

const loginForm = document.querySelector("#login");
const loginDiv = document.querySelector("#loginDiv");
const registratonForm = $q("#registration");
const registratonDiv = $q("#registrationDiv");
const fullName = $q("#regFullName");
const userName = $q("#regUsername");
const password = $q("#regPassword");
const signUPForm = $q("#signUPForm");
const loginFormSwitch = $q("#loginForm")

function registerNewUser(event) {
    event.preventDefault();

    const bodyData = {
        username: userName.value,
        fullName: fullName.value,
        password: password.value
    }

    fetch("https://microbloglite.herokuapp.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    }).then((response) => response.json)
        .then((user) => {
            console.log(user);
            window.location.href = "./index.html";
            sessionStorage.message = `Welcome ${userName.value}`
        })
        .catch((err) => {
            console.log(err);

        })

}


loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};


function displaySignUpPage() {
    if (registratonDiv.style.display === 'none') {
        registratonDiv.style.display = 'block'
        loginDiv.style.display = 'none'
    } else {
        registratonDiv.style.display = 'none'
        // loginForm.style.display = 'block'
    }
}

registratonDiv.style.display = 'none'

function displayLoginPage() {
    if (loginDiv.style.display === 'none') {
        loginDiv.style.display = 'block'
        registratonDiv.style.display = 'none'

    } else {
        loginDiv.style.display = 'none'
    }
}


window.onload = () => {
    registratonForm.onsubmit = registerNewUser;
    signUPForm.onclick = displaySignUpPage
    loginFormSwitch.onclick = displayLoginPage

}