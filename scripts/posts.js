"use strict";

// logout button event listener
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  logout();
});

// variables

const postsContainer = document.getElementById("postsDisplay"); //element to display the fetched posts
const storedAuthToken = localStorage.getItem("authToken"); // retrieves value stored in the webstorage to authToken
// local storage accesses the stored value in the browser;s storage

if (storedAuthToken) { // checks if the auth token is legit before making the request
    // fetches posts
  fetch("https://microbloglite.herokuapp.com/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedAuthToken}`
    }
  })
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement("div"); // creates a new div for each post
        postElement.textContent = post.text; // displays the text of each post inside the div
        postsContainer.appendChild(postElement); // appends postElement to postsContainer 
                                                // the above div is added to postsContainer as a child, displaying
                                                // the posts!
      });
    })
    .catch(error => { 
        // error message
      console.error("Error displaying user posts:", error);
    });
} else {
    // message telling user to login 
  console.log("Authentication token not found. Please log in.");
}
