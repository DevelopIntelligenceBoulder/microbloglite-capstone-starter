"use strict";

window.onload = init;

function init() {
    document.getElementById('postBtn').addEventListener('click', function (event) {
        event.preventDefault();

        const newPostContent = document.getElementById('newPost').value;
        const fileInput = document.getElementById('formFile');
        const imageUrl = fileInput.files.length > 0 ? URL.createObjectURL(fileInput.files[0]) : null;

        post(newPostContent, imageUrl);
    });
}

function post(content, imageUrl) {
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

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`,
        },
        body: JSON.stringify({ content: content, imageUrl: imageUrl }),
    };

    fetch(apiBaseURL + '/posts', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.assign('/post');
        })
        .catch(error => console.error('Error:', error));
}
