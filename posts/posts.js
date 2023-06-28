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
    console.log(loginData.token);

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/api/posts", options)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
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
                    <button class="like-button">❤</button>
                </div>
            </div>`;
                postContainer.innerHTML += cardHTML;
            });

           // attachLikeButtonEvents();
        })
        .catch(error => {
            console.error(error);
        });
}

postFetch();