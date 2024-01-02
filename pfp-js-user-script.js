"use strict";

window.onload = init;




function init() {
    let username;

    const fetchUsernamePromise = fetch(apiBaseURL + `/api/users/${username}`)
        .then(response => response.json())
        .then(usernameData => {
            username = usernameData;
            return usernameData;
        })
        .catch(error => console.error('Error:', error))
        .finally(() => {
            if (username) {
                fetchUserData(username)
                    .then(user => {
                        updateProfile(user);
                        return fetchUserPosts(username);
                    })
                    .then(posts => displayUserPosts(posts));
            }
        });

    // post form
    document.getElementById('postBtn').addEventListener('click', function (event) {
        event.preventDefault();

        const newPostContent = document.getElementById('newPost').value;
        const fileInput = document.getElementById('formFile');
        const imageUrl = fileInput.files.length > 0 ? URL.createObjectURL(fileInput.files[0]) : null;
        const newPostData = { content: newPostContent, imageUrl: imageUrl };

        displayPosts(newPostData, username);
    });
}



// update page
function updateProfile(user) {
    const profileImage = document.getElementById('img');
    const currentUser = document.getElementById('currentUser');
    const userBio = document.getElementById('userBio');
    const usersName = document.getElementById('name');

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

// post function for prev post and new posts


function displayPosts(newPostData, userId) {
    // show existing posts
    fetchUserPosts(username)
        .then(posts => {
            displayUserPosts(posts);
            
            // display and post the new post
            const postContainer = document.getElementById('postContainer');
            displayPostInContainer(newPostData, postContainer);

            // post new post
            postNewData(newPostData);
        });
}

function displayUserPosts(posts) {
    // display existing posts
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';

    posts.forEach(postData => {
        displayPostInContainer(postData, postContainer);
        return postNewData(newPostData);
    });

}

function displayPostInContainer(postData, container) {
    const newPostContainer = document.createElement('div');
    newPostContainer.classList.add('card', 'mb-3');

    const postRow = document.createElement('div');
    postRow.classList.add('row', 'g-0');

    // in case of no pic
    if (postData.imageUrl) {
        const postImgColumn = document.createElement('div');
        postImgColumn.classList.add('col-md-4');

        const postImage = document.createElement('img');
        postImage.src = postData.imageUrl;
        postImage.classList.add('img-fluid', 'rounded-start');
        postImage.alt = 'Post Image';

        postImgColumn.appendChild(postImage);
        postRow.appendChild(postImgColumn);
    }

    const postTextColumn = document.createElement('div');
    postTextColumn.classList.add('col-md-8');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const text = document.createElement('p');
    text.classList.add('card-text');
    text.textContent = postData.content;

    cardBody.appendChild(text);
    postTextColumn.appendChild(cardBody);
    postRow.appendChild(postTextColumn);

    newPostContainer.appendChild(postRow);
    container.appendChild(newPostContainer);
}

function postNewData(newPostData) {
    const loginData = getLoginData();

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(newPostData),
    };

    fetch(apiBaseURL + '/posts', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.assign('/post');
        })
        .catch(error => console.error('Error:', error));
}