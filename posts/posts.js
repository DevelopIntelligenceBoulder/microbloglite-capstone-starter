/* Posts Page JavaScript 

    prevent access to page unless visitor is logged in

    provide link to profile page

    include logoutBtn
        logout() function in auth.js
    
    

*/
"use strict";
import { isLoggedIn, getLoginData, logout } from "../auth.js";

window.onload = () => {

    if (!isLoggedIn()) {
        window.location.replace("/");
    }

    getAllPosts();
    // logout button variable
    let logoutBtn = document.getElementById('logout-btn');
    logoutBtn.onclick = () => {
        logout();
    }


}

// create post variables
let createPostForm = document.getElementById('create-post-form');
let postText = document.getElementById('post-text');
let postSubmit = document.getElementById('post-submit');
// display post variables
let allPosts = document.getElementById('all-posts');

let getAllPosts = () => {

    const loginData = getLoginData();

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    // apiUrl variable
    const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

    // fetch GET all posts
    fetch(`${apiBaseURL}/api/posts`, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Could not retrieve posts.");
            }
            return res.json();
        })
        .then((posts) => {
            // console.log(posts);
            posts.forEach((post)=> {
                console.log(post);
                // formats date into: (MON DD, YYYY, 0:00 AM/PM)
                let date = new Date(post.createdAt);
                let options = {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                };
                let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
                
                let postCardBody = document.createElement('div');
                postCardBody.classList.add('container', 'd-flex', 'justify-content-center');
                postCardBody.innerHTML = `
                    <div class="card" style='width: 75%;'>
                        <div class="card-body bg-dark text-white">
                            <p class="card-title">${post.username}</p>
                            <p class="card-text">${post.text}</p>
                            <p class="card-text fw-lighter">${formattedDate}</p>
                        </div>
                    </div>
                `;
                allPosts.appendChild(postCardBody);
            })
        })
        .catch((err) => console.err(err, 'Error'));
}
