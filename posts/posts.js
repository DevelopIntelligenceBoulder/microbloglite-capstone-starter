"use strict";


window.onload = showLoggedInUser()

const accessToken = JSON.parse(window.localStorage.getItem("login-data")).token;
getAllPosts(accessToken);

function showLoggedInUser() {
  const getCurrentUser = document.getElementById("profileLink")
  // console.log(getLoginData().username)
  const loggedInUser = getLoginData().username
  getCurrentUser.innerText = `${loggedInUser}'s Profile` 
}


function addPost() {
  let postTextarea = document.getElementById('postTextarea').value;
  const imageSecureUrl = imagePreview.src;


  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    
    body: JSON.stringify({ text: postTextarea })

  };
  fetch(apiBaseURL + "/api/posts", options)
    .then(response => response.json())
    .then(data => {
      parentElement;

      // Check if image is equal to a cloudinary URL before including it in createPost()
      if (imageSecureUrl === 'http://127.0.0.1:5501/posts/') {
        createPost(data, parentElement);
      } else {
        createPost(data, parentElement, imageSecureUrl);
      }

      console.log(data);

      // Reset the image preview
      document.getElementById('postTextarea').value = '';
      imagePreview.src = '';
      imagePreviewContainer.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
    });
  }


function createPost(post, parentElement, imageSecureUrl = '') {
  const postContainer = document.getElementById("postContainer");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "userInfo");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const postText = document.createElement("p");
  postText.classList.add("card-text");
  postText.textContent = post.text;

  const postDate = document.createElement('p');
  postDate.setAttribute('class', 'post-date');
  let str = post.createdAt;
  let date = str.slice(0, 10);
  let time = str.slice(11, 19);
  postDate.textContent = `${time} | ${date}`;

  const userName = document.createElement("h5");
  userName.classList.add("card-title");
  let uName = post.username;
  let fLetter = uName.charAt(0).toUpperCase();
  let subName = uName.slice(1);
  userName.textContent = fLetter + subName;


  // Create the image element if imageSecureUrl is provided
  if (imageSecureUrl) {
    const imagePostElement = document.createElement('img');
    imagePostElement.src = imageSecureUrl;
    imagePostElement.alt = "Uploaded Image";
    imagePostElement.classList.add('img-fluid');
    cardBody.appendChild(imagePostElement);
  }

  // Like functionality
  const likesArea = document.createElement("div");
  likesArea.classList.add("card-subtitle");

  const likeBtn = document.createElement('img');
  likeBtn.setAttribute('src', '../assets/like.svg');
  likeBtn.setAttribute('class', 'likeBtn');
  likesArea.appendChild(likeBtn);

  const spanElLike = document.createElement('span');
  spanElLike.setAttribute('id', 'spanElLike');
  spanElLike.textContent = 0;

  likeBtn.addEventListener('click', function () {
    if (spanElDislike.textContent == 0) {
      spanElLike.textContent = 1;
    } else if (spanElDislike.textContent == 1) {
      spanElDislike.textContent = 0;
      spanElLike.textContent = 1;
    }
    sendReaction(post._id, 'like');
  });

  likesArea.appendChild(spanElLike);

  const dislikeBtn = document.createElement('img');
  dislikeBtn.setAttribute('src', '../assets/dislike.svg');
  dislikeBtn.setAttribute('class', 'dislikeBtn');
  likesArea.appendChild(dislikeBtn);

  const spanElDislike = document.createElement('span');
  spanElDislike.setAttribute('id', 'spanElDislike');
  spanElDislike.textContent = 0;

  dislikeBtn.addEventListener('click', function() {
    if (spanElLike.textContent == 0) {
      spanElDislike.textContent = 1;
    } else if (spanElLike.textContent === 1) {
      spanElLike.textContent = 0;
      spanElDislike.textContent = 1;
    }
    sendReaction(post._id, 'dislike');
  });

  likesArea.appendChild(spanElDislike);

  // Append all elements to the card body
  cardBody.append(userName, postText, likesArea, postDate);

  cardContainer.appendChild(cardBody);
  postContainer.insertBefore(cardContainer, postContainer.firstChild);
}

// Reaction Function
function sendReaction(postId, reaction) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ postId, reaction })
  };
  // Test Server 
  console.log(reaction)
  console.log(postId)

  fetch(apiBaseURL + "/api/likes", options)
    .then(response => {
      if (response.ok) {
        console.log("Reaction saved successfully");
        console.log(response)
      } else {
        throw new Error("Failed post reaction");
      }
    })
    .catch(error => {
      console.error("Error occured:", error);
    });
}

// Get All Post
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
  postTextarea.value = null
  addPostBtn.innerText = 'Add Post'
  }, 4000);

});

// Back to Top of Page Feature

window.addEventListener('scroll', function() {
  const windowScrolled = window.scrollY
  if (windowScrolled > 120){
    document.getElementById('backToTop').classList.remove('hide')
  } else {
    document.getElementById('backToTop').classList.add('hide')

  }
})

let backToTop = document.getElementById('backToTop')
backToTop.addEventListener("click", function(){
  window.scrollTo({top: 0, behavior: "smooth"})
})
