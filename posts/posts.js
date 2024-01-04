/* Posts Page JavaScript */

"use strict";

/* Posts Page JavaScript */


// load all posts
function formatCreatedAt(createdAt) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString();
    return formattedDate;
}
function getPosts() {

    fetch(, {
        headers: {
            'Authorization': `Bearer ${getLoginData().token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayPosts(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function displayPosts(data) {
    const resultDiv = document.getElementById('allPosts')
    let html = ''
    for (let index = 0; index < data.length; index += 1) {
        const posts = data[index];
        html += ` <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-header"> ${posts.username}</h5>
            <h2>${posts.text}</h2>
            <p>${formatCreatedAt}</p2>
           

    </div>
</div>`;
    }

    resultDiv.innerHTML = html
}

//make function for fetch request
//it's POST REQUEST
//for /api/posts
//include in headers "Authorization": "Bearer ${token}"
//get token by looking in Auth JS at getLoginData and figuring how that function working

//after fetch function, have funciton that LOOPS through data gotten by fetch function
//so like let html = ""
// for (blah blah blah)
//html += `html that makes post cards`
//innerhtml = html
//done :D''

getPosts()