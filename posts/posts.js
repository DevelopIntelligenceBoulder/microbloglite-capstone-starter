/* Posts Page JavaScript */
"use strict";
//post form
//create selectors for form
// create a selector for variable to get input
const submit = document.querySelector('#submit');
const createPost = document.querySelector('#create-post');
const feed = document.querySelector('.feed');
const feeds = document.querySelector('.feeds');
const user = document.querySelector('.user');
const atName = document.querySelector(".atName");
const username = document.querySelector(".username");

const loginData = getLoginData();

function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}



function displayProfilePost() {
    const api = "https://microbloglite.herokuapp.com/api/posts";
    const options = {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
            
        },
    };
    const profileName = loginData.username;

    fetch(api, options)
        .then((response) => response.json())
        .then((posts) => {
            posts.forEach((post) => {
                if (profileName == post.username) {
                    card(post, cardSection);
                }
           
            });
            messagePara.innerText = `Post created`;
        });

}


function card(section) {
    // show 
    let postContent = $('#feeds');

    let resultHtml = `<div class="feed">
    <div class="head">
    <div class="user">
    <div class="profile-photo">
    <img src="./images/profile-13.jpg">
    </div> 
    <div class="ingo">
    <h3>${section.username}</h3>
    <small>${section.createdAt}</small>
    </div> 
    </div>

    <h4>${section.text} <span class="harsh-tag">#lifestyle</span></h4>
    
    <div class="comments text-muted">View all 0 comments</div>
    </div>
    `
    postContent.prepend(resultHtml);
}

function savePost(event) {
    event.preventDefault();
    const bodyData = {
        text: $('#create-Post').val(),
    };

    fetch("https://microbloglite.herokuapp.com/api/posts", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${loginData.token}`,
            },
            body: JSON.stringify(bodyData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            card(data, "");

            $('#create-Post').val('');
            // delete 
            // displayProfilePost();
            // window.location.href = "./profile.html"
        })
        .catch((err) => {
            console.log(err);
        });
}


function loadName() {
    username.innerText = loginData.fullname;
    atName.innerText = `@${loginData.username}`;
}

window.onload = () => {
    loadName();
    displayProfilePost();

};