"use strict";

const logoutButton = document.getElementById("logoutButton");
const postForm = document.getElementById("postForm");

window.onload = init;

function init() {
    logoutButton.onclick = logoutButtonClicked;
    postForm.onsubmit = createPost;
}

function logoutButtonClicked() {
    logout();
}

function createPost() {
    // Retrieve login data from local storage or use an empty object if not present
    const loginData = JSON.parse(localStorage.getItem("login-data")) || {};
    const postContent = document.getElementById("postContent").value;

    // Set up options for the fetch request
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: postContent }),
    };

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)
        .then(response => response.json())
        .then(data => {
            console.log("Post created successfully", data);
        })
        .catch(error => {
            console.error("Error creating post", error);
        });
}

// Function to toggle the display of a popup
function togglePopup() {
    const popup = document.getElementById("postsContainer");

    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
}

// Function to submit a blog post
function submitBlogPost() {
    const title = document.getElementById("title").value;
    const recipe = document.getElementById("recipe").value;
    const date = document.getElementById("date").value;

    // Check if any of the fields are empty and show an alert if true
    if (title.trim() === "" || recipe.trim() === "" || date.trim() === "") {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Call the togglePopup function
    togglePopup();
}
