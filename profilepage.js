"use strict";

window.onload = init;

function init() {

    // fwtch username
    let username;

   fetch(apiBaseURL + `/api/users/${username}`)
        .then(response => response.json())
        .then(usernameData => {
            username = usernameData.username; 
            return usernameData;
        })
        .catch(error => console.error('Error:', error))
        .finally(() => {
            if (username) {
                // if username available then get user data +  posts
                fetchUserData(username)
                    .then(user => {
                        // update profile 
                        updateProfile(user);
                        return fetchUserPosts(username);
                    })
                    .then(posts => displayUserPosts(posts));
            }
        });


    // post eventlistener
    document.getElementById('postBtn').addEventListener('click', function (event) {
        event.preventDefault();


        // new post const

        const newPostContent = document.getElementById('newPost').value;
        const fileInput = document.getElementById('formFile');
        const imageUrl = fileInput.files.length > 0 ? URL.createObjectURL(fileInput.files[0]) : null;

        // display new posts
        //
        displayPosts({ newPostContent, imageUrl });
    });
}

// update page
function updateProfile(user) {
    const profileImage = document.getElementById('img');
    const currentUser = document.getElementById('currentUser');
    const userBio = document.getElementById('userBio');
    const usersName = document.getElementById('name');

    // update elements
    profileImage.src = user.profileImage;
    currentUser.textContent = user.username;
    userBio.textContent = user.bio;
    usersName.textContent = user.fullname;
}

// get all posts made by this user
function fetchUserPosts(username) {
    return fetch(apiBaseURL + `/users/${username}/posts`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// post function for prev post 

function displayPosts({ newPostContent, imageUrl }) {
    // old posts
    fetchUserPosts(username)
        .then(posts => {
            // display  
            displayUserPosts(posts);

            // display + post new posts
            const postContainer = document.getElementById('postContainer');
            displayPostInContainer(newPostData, postContainer);

            // post new posts
            postNewData({ content: newPostContent, imageUrl });
        });
    }


// and new posts

function displayUserPosts(posts) {
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';

    posts.forEach(postData => {
        displayPostInContainer(postData, postContainer);
    });
}

// 

function displayPostInContainer({ content, imageUrl }) {    
    const loginData = getLoginData();

    const postContainer = document.getElementById('postContainer');

    const newPostContainer = document.createElement('div');
    newPostContainer.classList.add('card', 'mb-3');

    const postRow = document.createElement('div');
    postRow.classList.add('row', 'g-0');

    // in case of no pic
    if (imageUrl) {
        const postImageColumn = document.createElement('div');
        postImageColumn.classList.add('col-md-4');

        const postImage = document.createElement('img');
        postImage.src = imageUrl;
        postImage.classList.add('img-fluid', 'rounded-start');
        postImage.alt = 'Post Image';

        postImageColumn.appendChild(postImage);
        postRow.appendChild(postImageColumn);
    }

    const postTextColumn = document.createElement('div');
    postTextColumn.classList.add('col-md-8');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const text = document.createElement('p');
    text.classList.add('card-text');
    text.textContent = content;

    cardBody.appendChild(text);
    postTextColumn.appendChild(cardBody);
    postRow.appendChild(postTextColumn);

    newPostContainer.appendChild(postRow);
    postContainer.appendChild(newPostContainer);
}

function postNewData({ content, imageUrl }) {
    const loginData = getLoginData();

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`,
        },
        body: JSON.stringify({ content, imageUrl }),
    };

    // post new things to api
    fetch(apiBaseURL + '/posts', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.assign('/post');
        })
        .catch(error => console.error('Error:', error));
}
