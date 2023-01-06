"use strict";

window.onload = () => {
    const form = document.getElementById('login');
    form.addEventListener('submit', e =>{
        e.preventDefault();

        loggingIn();
    })
}
function loggingIn () {
    // POST /auth/login
    const user = document.getElementById('username');
    const pass = document.getElementById('password');

    const LoginInfo = {
        username: user.value,
        password: pass.value
    }
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
    };

    return fetch(api + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("./posts.html");  // redirect
            console.log(loginData);
            // console.log(window.location.href);
        });
}