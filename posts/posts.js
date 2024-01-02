/* Posts Page JavaScript */

"use strict";

// Function to handle logout
function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
}
document.getElementById("logoutLink").addEventListener("click", (event) => {
    event.preventDefault();
    logout();
});