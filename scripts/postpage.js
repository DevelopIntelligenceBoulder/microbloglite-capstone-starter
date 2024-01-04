"use strict";

//const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNocmlzIiwiaWF0IjoxNzA0MzgzMDEwLCJleHAiOjE3MDQ0Njk0MTB9.yAgvIpoD-lQSWxG9RY7_aHb7wZXNAvQdQ4LXrMXNzsE`
//getAllPosts(accessToken);

let username;
let accessToken;
const postContainer = document.getElementById('postContainer');

let apiLink = "https://microbloglite.onrender.com/api/posts?limit=100&offset=0";

window.onload = init();

function init(){

  document.addEventListener("DOMContentLoaded", function () {
    const loginData = getLoginData();

    if (loginData && loginData.token) {
        accessToken = loginData.token;
        displayUserPosts(loginData);
    } else {
        console.error('Invalid login data');
    }
});

// postBtn
document.getElementById('postBtn').addEventListener('click', function (event) {
    event.preventDefault();
    postUserData();
});

}

function getLoginData() {
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));
    if (!loginData || !loginData.token) {
        console.error('Invalid login data');
    }
    return loginData;
}


//function loadAllPosts(posts) {


    //const postContainer = document.getElementById("postContainer");
  
 //   for (let i = 0; i < posts.length; i++) {
 //     const post = posts[i];
 //     createPost(post, postContainer);
 //   }
//}

//function getAllPosts(accessToken) {

 // username = loginData.username; // Set the username


    //const options = {
    //  method: "GET",
    //  headers: {
    //    Authorization: `Bearer ${accessToken}`,
    //  },
   // };
  
  //  fetch(apiLink)
  //    .then((response) => {
  //      if (response.ok) {
   //       return response.json();
  //      } else {
  //        throw new Error("Failed to retrieve posts");
  //      }
  //    })
   //   .then((data) => {
   //     loadAllPosts(data);
  //    })
  //    .catch((error) => {
 //       console.error("Error fetching posts:", error);
//        });
//}

function displayUserPosts(loginData) {
  // const username = 'quiditch123';
  username = loginData.username; // Set the username
  fetch(apiLink, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  })
  .then(response => response.json())
  .then(posts => {
      const postContainer = document.getElementById("postContainer");
      if (!postContainer) {
          console.error("Error: postContainer not found");
          return;
      }

      posts.forEach(post => {
          const postElement = createPost(post);
          postContainer.appendChild(postElement);
      });
  })
  .catch(error => {
      console.error('Error fetching user posts:', error);
  });
}


function createPost(post) {
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

  // Append all elements to the card body
  cardBody.append(userName, postText, postDate);

  cardContainer.appendChild(cardBody);
  postContainer.insertBefore(cardContainer, postContainer.firstChild);

  return cardContainer
}

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

