/* Posts Page JavaScript */

"use strict";

window.onload = () => {
    fetchAllPosts();
}

function fetchAllPosts() {

    const userData = getLoginData();

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: "GET",
        headers: {
            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW4xMjMiLCJpYXQiOjE3MDQyMDc0NjMsImV4cCI6MTcwNDI5Mzg2M30.n8oVcxSiSLcKnj9DFV9BiBAeDQCTwrOxr97b7Rx33co"
                Authorization: `${userData.token}`
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

function likePost(postId){
    console.log(`this is the post being liked`, postId)
    const userData = getLoginData();

let bodyObject = {
    postId: postId
}
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes', {
        method: "POST",
        headers: {
            "mode": "no-cors", 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW4xMjMiLCJpYXQiOjE3MDQyMDc0NjMsImV4cCI6MTcwNDI5Mzg2M30.n8oVcxSiSLcKnj9DFV9BiBAeDQCTwrOxr97b7Rx33co"
             //    Authorization: `${userData.token}`
        },
        body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .then(likedPost => {
        console.log(likedPost);
        fetchAllPosts();
    })
}

function deletePost(postId) {
    console.log('Deleting post with ID:', postId);
    const userData = getLoginData();

    // get post data to check for username 
    if (!userData.username) {
       console.error(`YOU DONT HAVE PERMISSION TO DELETE THIS POST`)
       return; 
    }

    const apiUrl = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${postId}`;

    fetch(apiUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Authorization": `Bearer ${userData.token}`
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW4xMjMiLCJpYXQiOjE3MDQyMDc0NjMsImV4cCI6MTcwNDI5Mzg2M30.n8oVcxSiSLcKnj9DFV9BiBAeDQCTwrOxr97b7Rx33co"
        }
    })
    .then(response => { 
        response.json() 
    })
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

    allPosts.map(post => {
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

