/* Posts Page JavaScript */
// Assume this data comes from a server-side API
const postData = {
    author: 'John Doe',
    timestamp: 'Jan 1, 2021',
    content: 'Hello, world!',
    image: 'https://example.com/image.jpg',
    avatar: 'https://example.com/avatar.jpg',
}

// Get the elements by their ID
const postAvatar = document.getElementById('post-avatar');
const postAuthor = document.getElementById('post-author');
const postTimestamp = document.getElementById('post-timestamp');
const postContent = document.getElementById('post-content');
const postImage = document.getElementById('post-image');
const postActionButton = document.getElementById('post-action-button');

// Set the elements' content
postAvatar.src = postData.avatar;
postAuthor.textContent = postData.author;
postTimestamp.textContent = postData.timestamp;
postContent.textContent = postData.content;
postImage.src = postData.image;

postActionButton.addEventListener("click", handleLike);

function handleLike(event) {
    event.preventDefault();
    console.log("like clicked");
    // handle the like event here
}

"use strict";

//This function is used to make a GET request to a server

function DisplayAllPost() {
  let element = document.getElementById("displayPostHere");

  let myHeaders = new Headers();

  let loginData = getLoginData();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  //This code is making a fetch request to the specified url with the given requestOptions.
  
  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=200&offset=0",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      document.getElementById("post").innerHTML = result.map(postTemplate).join(" ")
  
  })

//post template section for the card including name, text and when its created

}
DisplayAllPost();

function postTemplate(post) {
  return `<div class="card">

<div class="card-content">

<h3 class="card-title">${post.username}</h3>
</div>
<p class="card-description">${post.text}</p>
<p>${post.createdAt}</p>
</div>
</div>`
  element.innerHTML += postTemplate;
}





//   for (let i = 0; i < result.length; i++) {

  //     let userPostInfo = `${result[i].username} <br> ${result[i].createdAt} <br> ${result[i].text} <br>`;
  //     element.innerHTML += userPostInfo + "<br>";

  //   }
  // });

// let element = document.getElementById("displayPostHere");
        // let userPostInfo =  `
        //     <div id="user-post-info">
        //         <div>
        //             <span id="username">${result[i].username}</span>
        //             <span id="created-at">${result[i].createdAt}</span>
        //         </div>
        //         <div id="text">${result[i].text}</div>
        //     </div>`;
        // element.innerHTML += userPostInfo;

// // function authorizes that user is logged in and captures when they create a post
// function CreatePost() {
//   let myHeaders = new Headers();
//   // token authorization
//   let loginData = getLoginData();
//   myHeaders.append("accept", "application/json");
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "Bearer " + loginData.token);

//   let raw = JSON.stringify({
//     text: document.getElementById("capturePost").value,
//   });

//   let requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
//   DisplayAllPost();
// }