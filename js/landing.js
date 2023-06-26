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
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};
/*
// Function to handle login form submission
async function handleLogin(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const userData = await login(username, password);
      console.log('User logged in:', userData);
      // Redirect to posts.html on successful login
      window.location.href = '../html/posts.html';
    } catch (error) {
      console.error('Login Error:', error.message);
      // Display error message to the user
      alert('Login failed. Please try again.');
    }
  }
  
  // Attach event listener to the login form
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  */