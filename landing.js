"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
  event.preventDefault();

  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  loginForm.loginButton.disabled = true;

  // API endpoint for retrieving user credentials
  const endpoint = 'https://example.com/api/login';

  // Send a GET request to the API endpoint
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const foundUser = data.find(user => user.username === loginData.username && user.password === loginData.password);

      if (foundUser) {
        // User authentication successful
        alert('Login successful!');
        // Redirect to the dashboard or perform further actions
      } else {
        // Invalid credentials
        alert('Invalid username or password. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
};