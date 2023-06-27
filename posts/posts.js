/* Posts Page JavaScript */

"use strict";

// Function to handle the logout action
function logout() {
  // Clear any authentication-related data (replace this with your own implementation)
  clearAuthentication();

  // Redirect the user to the home page
  window.location.replace("/");
}

// Add event listener to wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function() {
  if (isLoggedIn() === false) window.location.replace("/");

  // Add click event listener to the logout link
  const logoutLink = document.getElementById("logout");
  logoutLink.addEventListener("click", logout);
});
