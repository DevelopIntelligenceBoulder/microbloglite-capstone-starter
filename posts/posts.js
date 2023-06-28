/* Posts Page JavaScript */

"use strict";

console.log('hi')

const createPostsDiv = document.getElementById('createPostsSection')
const createPostInput = document.getElementById('createPostInput')
const postBtn = document.getElementById('postBtn')
const logoutBtn = document.getElementById('logoutBtn')

const displayPostsDiv = document.getElementById('displayPostsDiv');

const postDisplayTemplate = document.getElementById('postDisplay')

const likeBtn = document.getElementById('likeBtn');

postBtn.addEventListener('click', () => {
    console.log(createPostInput.value)

    // fetch("https://microbloglite.herokuapp.com/api/posts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         text: createPostInput.value
    //     }),
    //     headers: {
    //         Authorization: `Bearer ${loginData.token}`,
    //         "Content-type": "application/json; charset=utf-8"
    //     }
    // });
});

logoutBtn.addEventListener('click', () => {
    logout();
});

window.onload = getPosts;

function getPosts () {
    const loginData = getLoginData();

    const options = { 
        method: "GET",
        headers: { 
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch("https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0", options)
        .then(response => response.json())
        .then((data) => {

            // let template, content, username, textPost

            // template = document.getElementById('postDisplay')

            // content = template.content

            // username = document.querySelectorAll('h3')
            // username.textContent = data.username;

            // textPost = document.querySelectorAll('h3 > p')
            // textPost.textContent = data.text;
            
            data.forEach((post) => {

                const content = `
                <div class="border p-3 m-3">
                <h3><span>@</span>${post.username}</h3>

                <p>${post.text}</p>

                <p class="fs-6 lead">${Date(post.createdAt).toLocaleString()}</p>
                </div>
                `
                const createButton = document.createElement('button')
                createButton.setAttribute('type','button')
                createButton.classList.add('btn', 'btn-danger')
                createButton.textContent = 'Like'

                displayPostsDiv.innerHTML += content;

                displayPostsDiv.append(createButton);
                
                // if("content" in document.createElement("template")) {

                //     displayPostsDiv.appendChild(template);
                // }
                
            })
        });
}


