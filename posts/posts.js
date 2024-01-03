"use strict";

window.onload = () => {
    const cardContainer = document.getElementById("card-container");
    const loginData = getLoginData();

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

// Modify createPostCard function
function createPostCard(post, loginData) {
    const formattedDate = new Date(post.createdAt).toLocaleString();

    return `
        <div class="col mb-4">
            <div class="card mb-3 custom-card">
                <div class="card-body">
                    <div class="card-header">
                        <h2 class="card-title" id="post-username">${post.username}</h2>
                    </div>
                    <p class="card-text" id="content-text">${post.text}</p>
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
                            <i class="fas fa-heart"></i> Like
                        </button>
                        <span id="like-count-${post._id}" class="ml-2">${post.likes.length}</span>
                    </div>
                    <div>
                        <p class="card-date">${formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>`;
}

// Delete a post
function deletePost(postId) {
    const loginData = getLoginData();

    if (typeof postId !== 'string' && !(postId instanceof String)) {
        console.error("Invalid postId:", postId);
        return;
    }
    // Confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
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
    const loginData = getLoginData();

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
        const likeCountElement = document.getElementById(`like-count-${postId}`);

        if (likeCountElement) {
            const currentLikeCount = parseInt(likeCountElement.textContent) || 0;
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
