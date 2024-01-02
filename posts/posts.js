"use strict";


window.onload = () => {
    let cardContainer = document.getElementById("card-container");
    let loginData = getLoginData();

    // Check if the user is logged in
    if (!loginData.token) {
        // If the user is not logged in, throw an error
        console.error('User needs to log in!');
        return;
    }

    // GET method to retrieve posts
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${loginData.token}`
        }
    })
        .then((res) => res.json())
        .then((posts) => {
            if (Array.isArray(posts)) {
                // Iterate through posts and display them
                posts.forEach((post) => {
                    // Format the date
                    let formattedDate = new Date(post.createdAt).toLocaleString();

                    cardContainer.innerHTML += `
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
                                    <div>
                                        <button class="btn" onclick="likePost('${post._id}')">
                                            <i class="fas fa-heart"></i> Like
                                        </button>
                                        <button class="btn" onclick="deleteLike">
                                            <i class="fas fa-heart"></i> Unlike
                                        </button>
                                        <p class="card-text fw-lighter">${formattedDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });
            }
        });
};

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




function escapeHTML(text) {
    let div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};
