/* Posts Page JavaScript */

"use strict";

window.onload = () => {
    fetchAllPosts();
}

function fetchAllPosts() {
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikp1YW4gVGVzdGluZyIsImlhdCI6MTcwMzI2NzUwNywiZXhwIjoxNzAzMzUzOTA3fQ.FCg9P1mI73ZOKoC_E4nNK7mIwCvBbEqVTMIpdv3L3oU"
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

function displayAllPosts(allPosts) {
    let allPostContainer = document.getElementById("allPostContainer");

    allPosts.map(post => {
        allPostContainer.innerHTML += `
        <div class="card">
            <div class="card-body">
                <h3>${post.text}</h3>
                <p> By: ${post.username}</p>
                <p>Likes: ${post.likes.count}</p>
            </div>
        </div>
        `;
    });
}

