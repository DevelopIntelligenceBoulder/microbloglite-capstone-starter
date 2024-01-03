"use strict";

// ids
// user data

// postContainer
const postContainer = document.getElementById('postContainer');

window.onload = init;

function init() {
    //  login information
    const loginData = getLoginData();
    loadData(loginData);
    displayUserPosts(loginData);
    
    }
    
    function loadData(loginData) {
        
        const currentUser = document.getElementById('currentUser');
        const userBio = document.getElementById('userBio');
        
        getLoginData(loginData)
        
        const username = 'quiditch123'; //fix to work with other users  and make global
        
        
        fetch(apiBaseURL + `/api/users/${username}`, {
            headers: {
                Authorization: //Bearer ${loginData.token} fix this to fetch and work with other tokens
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1aWRpdGNoMTIzIiwiaWF0IjoxNzA0MjkzNTk4LCJleHAiOjE3MDQzNzk5OTh9.RnTp-AZ-mSEpx5Dj6jcFCJeFph8VPE9Exgq-peTAx58`,
            },
        })
        .then(response => response.json())
        .then(data => {
            userBio.textContent = data.bio;
            currentUser.textContent = data.fullName;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
        
        
    }

    // https://microbloglite.onrender.com/api/posts?limit=100&offset=0&username=quiditch123 get all post url
    
    // fetch and display users posts
    
    function displayUserPosts(loginData) {
        const username = 'quiditch123';
        
        fetch(apiBaseURL + `/api/posts?limit=100&offset=0&username=${username}`, {
            headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1aWRpdGNoMTIzIiwiaWF0IjoxNzA0MjkzNTk4LCJleHAiOjE3MDQzNzk5OTh9.RnTp-AZ-mSEpx5Dj6jcFCJeFph8VPE9Exgq-peTAx58`,
        },
    })
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const postElement = createPostElement(post);
            postContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching user posts:', error);
    });
}

function createPostElement(post) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'mb-3', 'w-18');
    
    const cardBodyElement = document.createElement('div');
    cardBodyElement.classList.add('card-body');
    
    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = `Username: ${post.username}`;
    
    const subtitleElement = document.createElement('h6');
    subtitleElement.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
    subtitleElement.textContent = `Created at: ${post.createdAt}`;
    
    const contentElement = document.createElement('p');
    contentElement.classList.add('card-text');
    contentElement.textContent = post.text;
    
    
    cardBodyElement.appendChild(titleElement);
    cardBodyElement.appendChild(subtitleElement);
    cardBodyElement.appendChild(contentElement);
    cardElement.appendChild(cardBodyElement);
    
    return cardElement;
}

// create a post

function postUserData() {
    const newPostContent = document.getElementById('newPost').value;
    const username = 'quiditch123';
    
    const postUrl = `${apiBaseURL}/api/posts`;
    
    const postData = {
        text: newPostContent
    };
    
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1aWRpdGNoMTIzIiwiaWF0IjoxNzA0MjkzNTk4LCJleHAiOjE3MDQzNzk5OTh9.RnTp-AZ-mSEpx5Dj6jcFCJeFph8VPE9Exgq-peTAx58`,
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post successful:', data);
        displayUserPosts();

        document.getElementById('newPost').value = '';
    })
    .catch(error => {
        console.error('Error posting user data:', error);
    });
}

// postBtn
document.getElementById('postBtn').addEventListener('click', function (event) {
    event.preventDefault();
    postUserData();
});





