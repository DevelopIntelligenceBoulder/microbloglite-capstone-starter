"use strict";

// This function checks if a user is logged in, and redirects them
// to the login page if they are not.
function checkLoggedOut() {
  if (!isLoggedIn()) {
    window.location.href = "../html/landing.html";
  }
}

// This function is called when the user clicks the "Logout" button.
// It calls the `logout()` function and redirects to the landing page.
async function handleLogout(event) {
  event.preventDefault();

  try {
    await logout();
    window.location.href = "../html/landing.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
    alert("Failed to logout. Please try again.");
  }
}

// Add event listener to the logout button
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", handleLogout);

// Check if user is logged out on page load
checkLoggedOut();
