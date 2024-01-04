"use strict";

// ids
// user data
let username;
let accessToken;
// postContainer
const postContainer = document.getElementById('postContainer');

window.onload = init;

function init() {
    //  login information
    const loginData = getLoginData();

    if (loginData && loginData.token) {
        accessToken = loginData.token;
        loadData(loginData);
        displayUserPosts(loginData);
    } else {
        console.error('Invalid login data');
    
    }
}

    function getLoginData() {
        const loginData = JSON.parse(window.localStorage.getItem("login-data"));
        if (!loginData || !loginData.token) {
            console.error('Invalid login data');
        }
        return loginData;
    }

    
    function loadData(loginData) {
        const username = loginData.username;
        
        const currentUser = document.getElementById('currentUser');
        const userBio = document.getElementById('userBio');
        
        getLoginData(loginData)
        
        //const username = 'quiditch123'; //fix to work with other users  and make global
        
        fetch(apiBaseURL + `/api/users/${username}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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
       // const username = 'quiditch123';
       username = loginData.username; // Set the username
       fetch(apiBaseURL + `/api/posts?limit=100&offset=0&username=${username}`, {
           headers: {
               Authorization: `Bearer ${accessToken}`,
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

// date string
const createdAtDate = new Date(post.createdAt);

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};

const formattedDate = createdAtDate.toLocaleString(undefined, options);
subtitleElement.textContent = `Created at: ${formattedDate}`;
    
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
    //const username = 'quiditch123';
    
    const postUrl = `${apiBaseURL}/api/posts`;
    
    const postData = {
        text: newPostContent
    };
    
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
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





