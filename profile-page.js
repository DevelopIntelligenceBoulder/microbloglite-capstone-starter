"use strict"

function login() {
    const loginData = getLoginData();
}

fetch(api + "/profile/logout", options)
.then(response => response.json())
.then(data=> console.log(data))
.finally(() => {

    window.localStorage.removeItem("login-data");
    window.location.assign("../index.html");
});

window.onload = () => {
    const $q = (s) => document.querySelector(s);
    const logoutButton =$q('#logoutButton');

    logoutButton.onClick = logout;
}