/* Posts Page JavaScript */
"use strict";

window.onload = () => {
    let cardContainer = document.getElementById("card-container");
    let loginData = getLoginData();

    // Check if user is logged in
    if (!loginData.token) {
        // If user is not logged in, throw an error
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
                                        <small id="post-created">${formattedDate}</small>
                                    </div>
                                    <div>
                                        <button class="btn" id="like-button" onclick="likeAndDislike('${post.postId}')">
                                            <i class="fas fa-heart"></i> Like
                                        </button>
                                        <span class="ms-2" id="like-count">${post.likes}</span>
                                        
                                        <button class="btn" id="dislike-button" onclick="likeAndDislike('${post.postId}')">
                                            <i class="fas fa-thumbs-down"></i> Dislike
                                        </button>
                                        <span class="ms-2" id="dislike-count">${post.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
                });
            } else {
                console.error('Invalid response format.');
            }
        })
        .catch((error) => {
            console.error('Error fetching posts:', error);
        });
}

function escapeHTML(text) {
    let div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
