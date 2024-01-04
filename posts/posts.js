/* Posts Page JavaScript */

"use strict";


window.onload = function (_event) {
    getPosts()
        .then(populatePostcards)
}

function getPosts() {
    const {token} = getLoginData()
    const options = {
        headers: {
             Authorization: `Bearer ${token}`,
        }
    }

    return fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts`, options)
        .then(response => response.json())
}

function populatePostcards(posts) {
    let html = ""
    for (const currentPost of (posts)) {
        html += `
            <div class="card border-light mb-3" style="max-width: 20rem;">
                <div class="card-title">${currentPost.username}</div>
                <div class="card-body">
                    <h4>${currentPost.text}</h4>
                </div>
                <p class="text">${formatDate(currentPost.createdAt)}</p>
                <p class="text"><strong>Likes:</strong> ${currentPost.likes.length}</p>
            </div>
        `
    }

    document.body.innerHTML += html
}

function formatDate (timestamp) {
    const date = new Date(timestamp)
    const formatOptions = {
        dateStyle: 'long',  // "long", "medium", "short"
        timeStyle: 'short',   // "long", "medium", "short"
    }
    return new Intl.DateTimeFormat(undefined, formatOptions).format(date)
}

// Example usage: formatDate('2024-01-03T21:16:54.441Z')  ➡️  'Jan 3, 2024, 4:16 PM'
// For more information on the format options, check out: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#style_shortcuts


//const resultDiv = document.getElementById("populatePostcards")
//resultDiv.innerHTML += html


