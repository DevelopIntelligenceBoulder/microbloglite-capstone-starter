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
            console.log(posts);
        })
        .catch((err) => console.err(err, 'Error'));
}
