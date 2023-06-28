"use strict";

  const accessToken = JSON.parse(window.localStorage.getItem("login-data")).token;
  getAllPosts(accessToken);



function showUserName() {
  const currentUser = JSON.parse(window.localStorage.getItem("login-data")).username;
  return currentUser
}

function addPost() {
let postTextarea = document.getElementById('postTextarea').value
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: postTextarea})
  };
  fetch(apiBaseURL + "/api/posts", options)
  .then(response => response.json())
  .then(data =>{
    let parEl = document.getElementById('postParent')
    console.log(data)
    createPost(data, parentElement)
  }).catch (error => {
    console.log(error)
  })
  
}

function createPost(post) {
  const postContainer = document.getElementById("postContainer");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "mb-3", "userInfo");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const postText = document.createElement("p");
  postText.classList.add("card-text");
  postText.textContent = post.text;

  const postDate = document.createElement('p')
  postDate.setAttribute('class', 'post-date')
  let str = post.createdAt
  let date = str.slice(0, 10)
  let time = str.slice(11, 19)
  postDate.textContent = `${time} | ${date}`;

  const userName = document.createElement("h5");
  userName.classList.add("card-title");
  let uName = post.username
  let fLetter = uName.charAt(0).toUpperCase()
  let subName = uName.slice(1)
  userName.textContent = fLetter + subName;

  const likesArea = document.createElement("h6");
  likesArea.classList.add("card-subtitle", "text-muted");
  likesArea.textContent = `${post.likes}`;

  cardBody.appendChild(userName);
  cardBody.appendChild(postText);
  cardBody.appendChild(likesArea);
  cardBody.appendChild(postDate);

  cardContainer.appendChild(cardBody);
  postContainer.insertBefore(cardContainer, postContainer.firstChild);
}


// Get all post
function getAllPosts(accessToken) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve posts");
      }
    })
    .then((data) => {
      const postContainer = document.getElementById("postContainer");
      postContainer.innerHTML = "";
      loadAllPosts(data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

const parentElement = document.querySelector("main");

function loadAllPosts(posts) {
  const postContainer = document.getElementById("postContainer");

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    createPost(post, postContainer);
  }
}


let addPostClick = document.getElementById('addPostButton');
let roller = document.getElementById('roller')
let addPostBtn = document.getElementById('add-post')

addPostClick.addEventListener('click', function() {
  addPostBtn.classList.add('hide')
  roller.classList.remove('hide')
  setTimeout(() => {
    addPostBtn.classList.remove('hide')
    addPostBtn.innerText = 'Posted!'
    roller.classList.add('hide')
    
  }, 2000);
  setTimeout(() => {
    let postTextarea = document.getElementById('postTextarea');
  addPost(accessToken, postTextarea.value);
  postTextarea.textContent = null;
  addPostBtn.innerText = 'Add Post'
  }, 4000);
});

