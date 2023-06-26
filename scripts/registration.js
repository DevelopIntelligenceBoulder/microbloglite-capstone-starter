"use strict";
const usernameInputEl = document.getElementById("floatingInput");
const passwordInputEl = document.getElementById("floatingPassword");
const fullnameInputEl = document.getElementById("fullnameInput");
const registerBtnEl = document.getElementById("registerButton");

// registerBtnEl.onclick = register;

registerBtnEl.addEventListener("click", () => {
    let bodyData = {
        username: usernameInputEl.value,
        fullName: fullnameInputEl.value,
        password: passwordInputEl.value,
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
    };

    return fetch("https://microbloglite.herokuapp.com/api/users", options)
        .then((response) => response.json())
        .then((loginData) => {
            window.location.assign("../index.html");
        });
});