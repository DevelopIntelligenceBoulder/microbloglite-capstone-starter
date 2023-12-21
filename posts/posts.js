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
                    <div class="card-body">
                        <h2 class="card-title" id="post-username">${post.username}</h2>
                        <p class="card-text" id="content-text">${post.text}</p>
                        <p class="card-date" id="post-created">${formattedDate}</p>
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