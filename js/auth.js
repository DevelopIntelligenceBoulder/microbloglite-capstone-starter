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

// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
async function login(loginData) {
  // POST /auth/login
  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  try {
    const response = await fetch(apiBaseURL + "/auth/login", options);
    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const loginData = await response.json();
    window.localStorage.setItem("login-data", JSON.stringify(loginData));
    window.location.assign("/posts"); // redirect

    return loginData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
async function logout() {
  const loginData = getLoginData();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  try {
    const response = await fetch(apiBaseURL + "/auth/logout", options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    // We're using `finally()` so that we will continue with the
    // browser side of logging out (below) even if there is an
    // error with the fetch request above.

    window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
    window.location.assign("/"); // redirect back to landing page
  }
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

    // Store login data in localStorage
    const loginData = { username, token };
    window.localStorage.setItem("login-data", JSON.stringify(loginData));

    // Redirect to the home page or dashboard
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
      const response = await fetch('https://microbloglite.herokuapp.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await handleAPIError(response);
      return data;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  }
  
  // Function to handle user logout
  async function logout() {
    try {
      const response = await fetch('https://microbloglite.herokuapp.com/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await handleAPIError(response);
      return data;
    } catch (error) {
      console.error('Logout Error:', error.message);
      throw error;
    }
  }
  