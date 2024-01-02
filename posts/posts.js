"use strict";

let userData; 

window.onload = () => {
    fetchAllPosts();
    
}

function fetchAllPosts() {
    userData = getLoginData();


    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    })
    .then(res => res.json())
    .then(allPosts => {
        console.log(allPosts);
        displayAllPosts(allPosts);
    })
    .catch(error => {
        console.error("THIS AIN'T WORKING", error);
    });
}

function likePost(postId) {
    let bodyObject = {
        postId: postId
    };

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userData.token}`
        },
        body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .then(likedPost => {
        console.log(likedPost);
        fetchAllPosts();
    });
}

function deletePost(postId) {
    if (!userData.username) {
        console.error(`YOU DON'T HAVE PERMISSION TO DELETE THIS POST`);
        return;
    }

    const apiUrl = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${postId}`;

    fetch(apiUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userData.token}`
        }
    })
    .then(response => response.json())
    .then(deletedPost => {
        console.log(`Post with ID ${postId} deleted successfully.`, deletedPost);
        fetchAllPosts();
    })
    .catch(error => {
        console.error('Error deleting post:', error);
    });
}

function displayAllPosts(allPosts) {
    let allPostContainer = document.getElementById("allPostContainer");
    allPostContainer.innerHTML = ""; 

    allPosts.forEach(post => {
        allPostContainer.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h3>${post.text}</h3>
                    <p> By: ${post.username}</p>
                    <p>Likes: ${post.likes.length}</p>
                    <button class="btn btn-dark text-light" onclick="likePost('${post._id}')">Like</button>
                    <button class="btn btn-dark text-light" onclick="deletePost('${post._id}')">Delete Post</button> 
                </div>
            </div>
        `;
    });
}
