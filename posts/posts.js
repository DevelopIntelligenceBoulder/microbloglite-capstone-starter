"use strict";

window.onload = () => {
    let cardContainer = document.getElementById("card-container");
    let loginData = getLoginData();

    if (!loginData.token) {
        console.error('User needs to log in!');
        return;
    }
    // Fetch to get all posts
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${loginData.token}`
        }
    })
        .then((res) => res.json())
        .then((posts) => {
            if (Array.isArray(posts)) {
                posts.forEach((post) => {
                    cardContainer.innerHTML += createPostCard(post, loginData);
                });
            }
        });
};

function countLikes(likes) {
    return likes.length;
}

function createPostCard(post, loginData) {
    let formattedDate = new Date(post.createdAt);
    let datePart = formattedDate.toLocaleDateString();
    let timePart = formattedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Combine date and time
    let dateTimeString = `${datePart} ${timePart}`;


    return `
        <div class="col mb-4">
            <div class="card mb-3 custom-card">
                <div class="card-body">
                    <div class="card-header">
                        <h2 class="card-title" id="post-username">${post.username}</h2>
                    </div>
                    <div class="card-text" id="content-text" style="overflow: auto; max-height: 150px;">${post.text}</div>
                </div>

                <div class="card-footer text-muted d-flex justify-content-between align-items-center">
                    <div>
                        ${post.username === loginData.username ?
            `<button class="btn delete-btn" data-post-id="${post._id}" onclick="deletePost('${post._id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>` : ''}
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="like-button like-btn" id="${post._id}" onclick="likeUnlikeToggle('${post._id}')">
                            <i class="fas fa-heart btn-like"></i> Like
                        </button>
                        <span class="likes-count">${countLikes(post.likes)} Likes</span>
                    </div>
                    <div>
                        <p class="card-date">${dateTimeString}</p>
                    </div>
                </div>
            </div>
        </div>`;
}


// Delete a post
function deletePost(postId) {
    let loginData = getLoginData();

    if (typeof postId !== 'string' && !(postId instanceof String)) {
        console.error("Invalid postId:", postId);
        return;
    }

    // Confirmation
    let isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) {
        return;
    }

    // Fetch post id and delete
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${loginData.token}`
        }
    })
        .then((res) => {
            if (res.ok) {
                console.log(`Post with ID ${postId} deleted successfully.`);
                location.reload();
            } else {
                console.error(`Failed to delete post.`);
            }
        })
        .catch((error) => {
            console.error("Error deleting post:", error);
        });
}

// Toggle to give and remove a like
function likeUnlikeToggle(postId) {
    if (window.localStorage.getItem(postId) === null) {
        toggleLike(postId)
    } else {
        untoggleLike(postId)
    }
}

// Give a like
function toggleLike(postId) {
    let loginData = getLoginData();

    let likeButton = document.querySelector(`button[id='${postId}']`)
    likeButton.classList.toggle('like-btn')
    let options = {
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
            window.localStorage.setItem(data.postId, data._id)
            window.location.reload()
            
        });
}

// Remove a like
function untoggleLike(postId) {
    let loginData = getLoginData();

    let likeButton = document.querySelector(`button[id='${postId}']`)
    likeButton.classList.toggle('like-btn')
    let endpoint = window.localStorage.getItem(postId)
    let options = {
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