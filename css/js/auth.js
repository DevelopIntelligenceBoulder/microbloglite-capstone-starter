"use strict";

const apiBaseURL = "https://microbloglite.herokuapp.com";

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

// Helper function to handle API errors
function handleAPIError(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// Function to handle user login
async function login(username, password) {
  try {
    const response = await fetch(apiBaseURL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleAPIError(response);
    return data;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
}

// Function to handle user logout
async function logout() {
  try {
    const loginData = getLoginData();
    const response = await fetch(apiBaseURL + "/auth/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    const data = await handleAPIError(response);
    return data;
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  } finally {
    window.localStorage.removeItem("login-data");
    window.location.assign("/");
  }
}

// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
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
    const response = await fetch(`${apiBaseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const { token } = await response.json();

    const loginData = { username, token };
    window.localStorage.setItem("login-data", JSON.stringify(loginData));

    window.location.href = "../html/home.html";
  } catch (error) {
    console.log(error);
    alert(error.message);
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Login";
  }
}

// Add event listener to the login form
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", handleLoginForm);
