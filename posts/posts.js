"use strict";

window.onload = () => {
    let cardContainer = document.getElementById("card-container");
    let loginData = getLoginData();

    if (!loginData.token) {
        console.error('User needs to log in!');
        return;
    }

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
                        <button class="btn like-btn" data-post-id="${post._id}" onclick="likePost('${post._id}')">
                            <i class="fas fa-heart btn-like"></i> Like
                        </button>
                        <span id="like-count-${post._id}" class="ml-2">${post.likes.length}</span>
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

// Like a post
function likePost(postId) {
    let loginData = getLoginData();

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({ postId: postId })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            if (res.status === 399) {
                console.log("Post already liked.");
            } else {
                throw new Error("Failed to like post");
            }
        }
    })
    .then((data) => {
        let likeCountElement = document.getElementById(`like-count-${postId}`);

        if (likeCountElement) {
            let currentLikeCount = parseInt(likeCountElement.textContent) || 0;
            likeCountElement.textContent = currentLikeCount + 1;
        }

        console.log("Post liked successfully:", data);
    })
    .catch(error => console.error("Error:", error));
}



// function escapeHTML(text) {
//     let div = document.createElement('div');
//     div.textContent = text;
//     return div.innerHTML;
// };
