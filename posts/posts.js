"use strict";

window.onload = () => {
    fetchAllPosts();
};

function fetchAllPosts() {
    const token = getLoginData().token;

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    })
    .then(allPosts => {
        console.log(allPosts);
        displayAllPosts(allPosts);
    })
    .catch(error => {
        console.error("Failed to fetch posts:", error);
    });
}

function likePost(postId) {
    console.log(`Liking post with ID: ${postId}`);
    const token = getLoginData().token;

    const bodyObject = {
        postId: postId
    };

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to like the post');
        }
        return response.json();
    })
    .then(likedPost => {
        console.log(likedPost);
        fetchAllPosts();
    })
    .catch(error => {
        console.error("Failed to like the post:", error);
    });
}

function deletePost(postId) {
    const token = getLoginData().token;
    const apiUrl = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${postId}`;

    // Fetch post data to check for the creator
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(postData => {
        if (getLoginData().username === postData.username) {
            // If yes, proceed with the delete request
            return fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            const card = document.getElementById(`postCard_${postId}`);
            if (card) {
                const errMsg = document.createElement('p');
                errMsg.innerHTML = "You don't have permission to delete this post.";
                errMsg.style.color = "red";
                card.appendChild(errMsg);
            }
            // Throw an error to prevent card removal
            throw new Error("Permission denied");
        }
    })
    .then(() => {
        // This block will only be executed if the post deletion was successful
        const card = document.getElementById(`postCard_${postId}`);
        if (card) {
            card.remove();
        }
    })
    .catch(error => {
        console.error('Error deleting post', error);
    });
}

function displayAllPosts(allPosts) {
    const allPostContainer = document.getElementById("allPostContainer");
  

    allPosts.forEach(post => {
       
        const card = document.createElement('div');
        card.className = 'card mb-3';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        cardBody.innerHTML = `
            <h3 class="card-title">${post.text}</h3>
            <p class="card-text">By: ${post.username}</p>
            <p class="card-text">Likes: ${post.likes.length}</p>
            <button class="btn btn-dark text-light" onclick="likePost('${post._id}')">Like</button>
            <button class="btn btn-dark text-light" onclick="deletePost('${post._id}')">Delete Post</button>
        `;

        // Append card body to the card
        card.appendChild(cardBody);

        // Set card ID and append to the container
        card.id = `postCard_${post._id}`;
        allPostContainer.appendChild(card);
    });
}

