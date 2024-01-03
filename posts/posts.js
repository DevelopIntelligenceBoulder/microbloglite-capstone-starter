"use strict";

let userData; 

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
    .then(response => response.json())
    .then(allPosts => {
        console.log(allPosts);
        displayAllPosts(allPosts);
    })
    .catch(error => {
        console.error("Failed to fetch posts", error);
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
         response.json();
    })
    .then(likedPost => {
        console.log(likedPost);
        fetchAllPosts();
    })
    .catch(error => {
        console.error("Failed to like the post:", error);

    });
}

// function unlikePost(likeId) {
//     console.log(`Unliking post with Like ID: ${likeId}`);
//     const token = getLoginData().token;

//     fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/${likeId}`, {
//         method: "DELETE",
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(response => response.json())
//     .then(unlikedPost => {
//         console.log(unlikedPost);
//         fetchAllPosts();
//     })
//     .catch(error => {
//         console.error("Failed to unlike the post:", error);
//     });
// }

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
    // CHECKING TO SEE IF LOGGED IN USERNAME MATCHES THE PERSON WHO CREATED IT
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
            // THIS WILL STOP CODE FROM CONTINUING AND MOVE ON TO THE CATCH ERROR
            throw new Error("Permission denied");
        }
    })
    .then(() => {
        // IF POST CAN DELETE, THIS WILL RUN 
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
    let allPostContainer = document.getElementById("allPostContainer");
    allPostContainer.innerHTML = ""; 
  
    allPosts?.forEach(post => {
       
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

        card.appendChild(cardBody);
        // giving card id value -- with this we're able to do getElementById. 
        card.id = `postCard_${post._id}`;
        allPostContainer.appendChild(card);
    });
}

