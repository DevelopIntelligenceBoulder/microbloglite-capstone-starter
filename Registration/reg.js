"use strict";
console.log("hi");
const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

function signup() {
  const userData = {
    username: username,
    email: email,
    password: password,
  };

  // Send a POST request to the API endpoint
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
      if (data.success) {
        alert("Sign up successful!");
        // Redirect the user to the next page
        window.location.href = "./test.html";
      } else {
        alert("Sign up failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during sign up.");
    });
}
