/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "https://microbloglite.herokuapp.com";
// Backup server:   https://microbloglite.onrender.com

// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn() {
    const loginData = getLoginData();
    return !!loginData.token;
}

// Function to handle the login form submission
async function handleLoginForm(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "" || password === "") {
        alert("Please enter your username and password.");
        return;
    }

    const loginButton = document.getElementById("loginButton");
    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    try {
        const response = await fetch(`${apiBaseURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Invalid username or password");
        }

        const { token } = await response.json();

        // Store login data in localStorage
        const loginData = { username, token };
        window.localStorage.setItem("login-data", JSON.stringify(loginData));

        // Redirect to the home page or dashboard
        window.location.href = "home.html";
    } catch (error) {
        alert(error.message);
        loginButton.disabled = false;
        loginButton.textContent = "Login";
    }
}

// Add event listener to the login form
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", handleLoginForm);