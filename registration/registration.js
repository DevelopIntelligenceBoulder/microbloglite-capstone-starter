"use strict";

// Listen for form submission
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form input values
    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create an object with the user data
    const userData = {
      username: username,
      fullName: fullName,
      password: password,
    };

    // Make an API request to store the user data
    fetch("https://microbloglite.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        console.log("User data stored:", data);
        // Optionally, perform any additional actions or show a success message
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("Error storing user data:", error);
        // Optionally, show an error message to the user
      });
  });
