"use strict";

// This function checks if a user is already logged in and redirects
// them to the home page if they are.
function checkLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = "../html/home.html";
  }
}

// Check if user is already logged in on page load
checkLoggedIn();
