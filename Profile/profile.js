"use strict";

// Get references to HTML elements
const bio = document.getElementById("bio");
const postDescription = document.getElementById("postDescription");
const postBtn = document.getElementById("postBtn");
const postPage = document.getElementById("postPage");
const logOut = document.getElementById("logOut");
const bioText = document.getElementById("bioText");
const editBioContainer = document.getElementById("editBioContainer");
const editBioInput = document.getElementById("editBioInput");
const editBioBtn = document.getElementById("editBioBtn");
const updateBioBtn = document.getElementById("updateBioBtn");

// Get login data from storage
const loginData = getLoginData();
const token = loginData.token;

// Function to be executed when the window is loaded
window.onload = function () {
    console.log("window loaded");

    // Assign click event handlers to buttons
    postBtn.onclick = onPostBtnClick;
    logOut.onclick = logout;
    editBioBtn.onclick = onEditButtonClick;
    updateBioBtn.onclick = onUpdateBioBtnClick;

    // Hide the bio edit container initially
    editBioContainer.style.display = "none";

    // Retrieve saved bio from local storage, if available
    const savedBio = localStorage.getItem("bio");
    if (savedBio) {
        bioText.textContent = savedBio;
    }
}

// Function to execute when the Post button is clicked
function onPostBtnClick() {
    // Create a new post using the API!

    // Create JSON object to include in the request body
    let bodyData = {
        "text": postDescription.value
    };

    // Send the request to create a new post
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        },
    })
    .then(response => response.json())
    .then(post => {
        // If the POST request finishes successfully, display a message
        console.log(post);
        window.location.replace("../posts/index.html");
    });
}

// Function to execute when the Edit button is clicked
function onEditButtonClick() {
    // Set the value of the edit bio input box to the current bio text
    editBioInput.value = bioText.textContent;

    // Hide the bio text and show the edit bio input box
    bioText.style.display = "none";
    editBioContainer.style.display = "block";
    editBioBtn.style.display = "none"; // Hide the edit button
}

// Function to execute when the Update Bio button is clicked
function onUpdateBioBtnClick() {
    // Update the bio text with the value from the input box
    bioText.textContent = editBioInput.value;

    // Show the bio text and hide the edit bio input box
    bioText.style.display = "block";
    editBioContainer.style.display = "none";
    editBioBtn.style.display = "block"; // Show the edit button again

    let username = loginData.username;

    // Create JSON object to include in the request body
    let bodyData = {
        "bio": editBioInput.value
    };

    // Send the request to update the user's bio
    fetch(apiBaseURL + "/api/users/" + username, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        },
    })
    .then(response => response.json())
    .then(updatedProfile => {
        console.log(updatedProfile);

        // Update the bio text with the updated value
        bio.textContent = editBioInput.value;

        // Hide the edit bio input box and show the updated bio text content
        bioText.style.display = "block";
        editBioContainer.style.display = "none";

        // Show the edit button
        editBioBtn.style.display = "block";

        // Save the updated bio in local storage
        localStorage.setItem("bio", editBioInput.value);
    })
    .catch(error => {
        console.error("Error updating bio:", error);
    });
}

