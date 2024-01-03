/* Posts Page JavaScript */

"use strict";

//Prevent access to the page unless
//the visitor is logged in

//link to profile page

// include logout button *function provided!
// display all posts (display content,
// author, timestamp) *use fetch

// create vector imgs with a bud (unliked post)
// blooming flower (liked post)
// custom compass direction vector img (cursor)

//read me explanantion!

function createNewPost(title, content) {
  // Make an API request to send the new post data to the server
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${logindata.token}`,
    },
    body: JSON.stringify({ title: title, content: content }),
  })
    .then((response) => {
      // Handle the response data
    })
    //.catch((error) => {
      // Handle any errors that occur during the API request
    //});
}

// Event listener for the form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  createNewPost(title, content); // Call the function to send the new post data
});
