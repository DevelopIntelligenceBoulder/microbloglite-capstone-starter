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

/*function updateLikesCount(likesCountElement, likes) {
    const count = countLikes(likes);
    likesCountElement.textContent = count;
  }
  
  function handleLikeButtonClick(postId, likesCountElement, likeButton) {
    const loginData = getLoginData();
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    };
  
    fetch(apiBaseURL + `/api/posts/${postId}/like`, options)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Update the UI with the new likes count
          updateLikesCount(likesCountElement, data.likes);
          // Toggle the like button's appearance
          likeButton.classList.toggle("liked");
        } else {
          // Handle any error response from the API
          console.error(data.error);
        }
      })
      .catch(error => {
        // Handle fetch or network errors
        console.error(error);
      });
  }
  
function attachLikeButtonEvents() {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", () => {
            const postElement = likeButton.closest(".card");
            const likesCountElement = postElement.querySelector(".likes-count");
            const postId = postElement.dataset.postId;

            handleLikeButtonClick(postId, likesCountElement, likeButton);
        });
    });
}*/

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
            posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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