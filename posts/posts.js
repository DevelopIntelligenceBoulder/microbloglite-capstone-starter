/* Posts Page JavaScript */

"use strict";

const logoutButton = document.querySelector("#logout");
const postContainer = document.querySelector('#postContainer');
logoutButton.onclick = logout;

function convertDateTime(apiDateTime) {
    const date = new Date(apiDateTime);
    const formattedDateTime = date.toLocaleString();
    return formattedDateTime;
}

//LIKES FEATURE
function countLikes(likes) {
    return likes.length;
}

function postFetch() {
    const loginData = getLoginData();

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/api/posts", options)
        .then(response => response.json())
        .then(posts => {
            posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            posts.forEach(post => {

                if(window.localStorage.getItem(post._id) === null) {
                    const cardHTML = `
                    <div class="card text-center" id="cards" data-post-id="${post._id}">
                    <div class="card-header">
                    <b>@${post.username}</b>
                    </div>
                    <div class="card-body">
                    <p class="card-text">${post.text}</p>
                    </div><br>
                    <div class="card-footer text-muted">
                    ${convertDateTime(post.createdAt)}<br>
                    <span class="likes-count">${countLikes(post.likes)} Likes</span>
                    <button class="like-button" id="${post._id}" onclick="likedOrNah('${post._id}')">❤</button>
                    </div>
                    </div>
                    <br>`;
                    postContainer.innerHTML += cardHTML;
                } else {
                    const cardHTML = `
                    <div class="card text-center" id="cards" data-post-id="${post._id}">
                    <div class="card-header">
                    <b>@${post.username}</b>
                    </div>
                    <div class="card-body">
                    <p class="card-text" >${post.text}</p>
                    </div><br>
                    <div class="card-footer text-muted">
                    ${convertDateTime(post.createdAt)}<br>
                    <span class="likes-count">${countLikes(post.likes)} Likes</span>
                    <button class="like-button liked" id="${post._id}" onclick="likedOrNah('${post._id}')">❤</button>
                    </div>
                    </div>`;
                    postContainer.innerHTML += cardHTML;
                }
            });
            
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    window.onload = postFetch;
    
    function likedOrNah(postId) {
        if (window.localStorage.getItem(postId) === null) {
            toggleLike(postId)
        } else {
            untoggleLike(postId)
        }
    }
    
    function toggleLike(postId) {
        const loginData = getLoginData();
        const likeButton = document.querySelector(`button[id='${postId}']`)
        likeButton.classList.toggle('liked')
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${loginData.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId: postId }),
        };
        
        fetch(apiBaseURL + "/api/likes", options)
        .then((response) => response.json())
    .then((data) => {
        window.localStorage.setItem(data.postId,data._id)
        window.location.reload()
    });
    
}

function untoggleLike(postId) {
    const loginData = getLoginData();
    const likeButton = document.querySelector(`button[id='${postId}']`)
    likeButton.classList.toggle('liked')
    const endpoint = window.localStorage.getItem(postId)
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
        },
    };
    fetch(apiBaseURL + "/api/likes/" + endpoint, options)
    .then((response) => response.json())
    .then((data) => {
        window.localStorage.removeItem(postId)
        window.location.reload()
    });
}
