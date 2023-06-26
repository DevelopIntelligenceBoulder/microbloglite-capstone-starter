/* Posts Page JavaScript */

"use strict";
// Function to handle user logout
async function handleLogout() {
    try {
      await logout();
      console.log('User logged out');
      // Redirect to index.html on successful logout
      window.location.href = '../html/index.html';
    } catch (error) {
      console.error('Logout Error:', error.message);
      // Display error message to the user
      alert('Logout failed. Please try again.');
    }
  }
  
  // Attach event listener to the logout button
  document.getElementById('logoutButton').addEventListener('click', handleLogout);
  