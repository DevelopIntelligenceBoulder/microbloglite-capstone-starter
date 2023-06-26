"use strict";

// logout button
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  logout();
  
});

// display posts to all users with a fetch
fetch("https://microbloglite.herokuapp.com/api/users")
  .then(response => response.json())
  .then(users => {
