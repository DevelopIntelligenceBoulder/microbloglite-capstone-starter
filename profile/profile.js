"use strict";

// Imported functions
import { isLoggedIn, getLoginData, logout } from "../auth.js";

window.onload = () => {

    // If the user is not logged in, redirect to the home page
    if (!isLoggedIn()) {
        window.location.replace("/");
    }

    // Function call for getAllPosts
    // getAllPosts();

    // Logout button variable
    let logoutBtn = document.getElementById('logout');
    // Event listener for the logout button
    logoutBtn.onclick = () => {
        logout();
    };

};

// Initialized variables
const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com/";
const createPostForm = document.getElementById('create-post-form');

// Event handler for creating a new post
createPostForm.onsubmit = (e) => {
    e.preventDefault();
    let postText = document.getElementById('post-text').value;

    let postDataContent = {'text': postText};

    const loginData = getLoginData();

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(postDataContent)
    };

    fetch(`${apiBaseURL}/api/posts`, options)
    .then((res) => res.json())
    .then((newPostData) => {

        // Formats date into: (MON DD, YYYY, 0:00 AM/PM)
        let date = new Date(newPostData.createdAt);
        let options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        };
        let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        let newPost = document.createElement('div');
        newPost.classList.add('container', 'd-flex', 'justify-content-center');

        newPost.innerHTML = 
        `<div class="card" style='width: 75%;'>
            <div class="card-body bg-dark text-white">
                <p class="card-title">${newPostData.username}</p>
                <p class="card-text">${newPostData.text}</p>
                <p class="card-text fw-lighter">${formattedDate}</p>
            </div>
        </div>`;
        // allPosts.prepend(newPost);
        console.log(newPostData);

    })
    .catch((err) => console.error(err));

    createPostForm.reset();
};
