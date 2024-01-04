'use strict';

const postForm = document.getElementById('createPost');

postForm.onsubmit = createPost;

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const formatOptions = {
        dateStyle: 'medium',
        timeStyle: 'short'
    };
    return new Intl.DateTimeFormat(undefined, formatOptions).format(date);
}

function displayPost(username, text, createdAt) {
    const resultDiv = document.getElementById("resultDiv");
    let html =  `
        <p><strong>${username}</strong></p>
        <p>${text}</p>
        <p>${formatDate(createdAt)}</p>
    `;
    
    resultDiv.innerHTML += html;
}

function createPost(event) {
    event.preventDefault()

    const form = event.target
    const newPost = {
        text: form.elements.text.value.trim(),
    }

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getLoginData().token}`
        },
        body: JSON.stringify(newPost),
    })
    .then(response => response.json())
    .then(post => {
        console.log(post);
        displayPost(post.username, post.text, post.createdAt);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
