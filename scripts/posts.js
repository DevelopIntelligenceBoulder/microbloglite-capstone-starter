/* Posts Page JavaScript */

"use strict";

const logoutBtn = document.getElementById("logoutBtn");
const likeBtn = document.getElementById("likeBtn");
const unlikeBtn = document.getElementById("unlikeBtn");
const commentBtn = document.getElementById("commentBtn");
const userCard = document.getElementById("userCard");
//user will need to be logged into before they are able to enter page
// if (isLoggedIn() === false) {
//   window.location.replace("/");
// }

window.onload = function() {
  console.log("Page is loading....");
  logoutBtn.onclick = logoutBtnClicked;
  likeBtn.onclick = likeBtnClicked;
  unlikeBtn.onclick = unlikeBtnClicked;
  commentBtn.onclick = commentBtnClicked;
  viewAllPosts();
 
  hideUnlikeBtn();
};
function likeBtnClicked(){
  console.log("likeBTN has been clicked"); 
  hideLikeBtn();
  showUnlikeBtn();
  console.log("clicked")
}
function unlikeBtnClicked(){
hideUnlikeBtn();
showLikeBtn();
console.log("clicked")
}
function commentBtnClicked(){
  console.log("CLICKED")
}

function viewAllPosts() {

  let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmJvIiwiaWF0IjoxNjg3OTczOTg2LCJleHAiOjE2ODgwNjAzODZ9.d3XvJuXGOcVWwT9tmMhhMp2_HlK_w7NAPjwtkABVjYU" //this will need to be retreived from web storage, the login page should have put it in place.   At page startup if the user is not logged in with a valid token they should have 
  // been redirected to the login page so we should not be here without a valid auth token.

  console.log("inside of the view all posts...");

  let options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };


  fetch("https://microbloglite.onrender.com/api/posts", options)
    .then(response => response.json())
    .then(posts => {
      console.log(posts);
      const postContainer = document.querySelector('.postContainer');

      // Clear previous posts (optional)
      postContainer.innerHTML = '';

      posts.forEach(post => {
        // Create the outermost elements
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        let colDiv = document.createElement("div");
        colDiv.classList.add("col-4", "mt-3", "p-4", "p-md-5", "border", "rounded-3", "bg-body-tertiary", "shadow");

        let postsCardDiv = document.createElement("div");
        postsCardDiv.id = "postsCard";

        // Create the heading
        let heading = document.createElement("h2");
        heading.textContent = post.username;

        // Create the paragraph
        let paragraph = document.createElement("p");
        paragraph.textContent = post.text;

        // Create the horizontal rules
        let hr1 = document.createElement("hr");
        let hr2 = document.createElement("hr");

        // Create the SVG icons
        let unlikeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        unlikeBtnSvg.id = "unlikeBtn";
        unlikeBtnSvg.type = "button";
        unlikeBtnSvg.setAttribute("width", "40");
        unlikeBtnSvg.setAttribute("height", "40");
        unlikeBtnSvg.setAttribute("fill", "currentColor");
        unlikeBtnSvg.classList.add("bi", "bi-chat-heart-fill");
        unlikeBtnSvg.setAttribute("viewBox", "0 0 16 16");
        unlikeBtnSvg.innerHTML = '<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>';

        let likeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        likeBtnSvg.id = "likeBtn";
        likeBtnSvg.type = "button";
        likeBtnSvg.setAttribute("width", "40");
        likeBtnSvg.setAttribute("height", "40");
        likeBtnSvg.setAttribute("fill", "currentColor");
        likeBtnSvg.classList.add("bi", "bi-chat-heart");
        likeBtnSvg.setAttribute("viewBox", "0 0 16 16");
        likeBtnSvg.innerHTML = '<path fill-rule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>';

        // Append the elements to their respective parent elements
        postsCardDiv.appendChild(heading);
        postsCardDiv.appendChild(hr1);
        postsCardDiv.appendChild(paragraph);
        postsCardDiv.appendChild(hr2);
        postsCardDiv.appendChild(unlikeBtnSvg);
        postsCardDiv.appendChild(likeBtnSvg);

        colDiv.appendChild(postsCardDiv);
        rowDiv.appendChild(colDiv);
        postContainer.appendChild(rowDiv);
      });
    })
    .catch(error => {
      console.log("An error occurred while fetching the posts:", error);
    });
}



// Create a new post using POST
function createNewPost() {
  let bodyData = {
    username: document.getElementById("usernameIdField").value,
    text: document.getElementById("textIdField").value,
    likes: document.getElementById("likesIdField").value,
    createdAt: document.getElementById("createdAtIdField").value,
  };
  fetch("https://microbloglite.herokuapp.com/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer $ (loginData.token)`,
    }
  })
    .then(response => response.json())
    .then(json => {
      // If the POST finishes successfully, ...
      let confirmationMessage = document.getElementById(confirmationMessage);
      confirmationMessage.innerHTML = "New Post Added";
    })
    .catch(err => {
      // If the POST returns an error, ...
      let confirmationMessage = document.getElementById(confirmationMessage);
      confirmationMessage.innerHTML = "Unexpected error";
    });
}

// User logs out
function logoutBtnClicked() {
  function logout () {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}

  window.location.href  = 'index.html'; 
}

// function renderUserPosts(users) {
//   users.forEach(user => {
//     const div = document.createElement("div");
//     const image = document.createElement("img");
//     const name = document.createElement("h3");
//     const species = document.createElement("h3");
//     const like = document.createElement("button");
//     const unlike = document.createElement("button");
//     div.classList = "card";
//     image.classList = "card-img";
//     like.classList = "empty";
//     image.src = user.image;
//     name.innerText = `Name: ${user.fullName}`;
//     species.innerText = `Text: ${user.text}`;
//     like.textContent = "like";
//     unlike.textContent = "unlike";
//     div.appendChild(image);
//     div.appendChild(name);
//     div.appendChild(species);
//     div.appendChild(like);
//     cardsContainer.appendChild(div);
//   });
// }


function hideUnlikeBtn(){
  unlikeBtn.style.display = "none";
}
function showUnlikeBtn(){
  unlikeBtn.style.display = "block";
}
function hideLikeBtn(){
  likeBtn.style.display = "none";
}
function showLikeBtn(){
  likeBtn.style.display = "block";
}

// Fetch data from the API

// Create the HTML structure dynamically with the fetched data

// Set the heading text

//body: bodyData,
// function renderUserPosts(posts){
//   const postsCard = document.getElementById("postsCard"); 
//   posts.forEach(posts =>{
//     const postsInput = createPostsCard(posts); 
//     postsCard.appendChild(postsInput); 
//   })
// }



//old
// const card = document.createElement("div"); 
// card.classList.add("posts-card"); 

// const username = document.createElement("h2")
// username.textContent = posts.username; 

// const content = document.createElement("p"); 
// content.textContent = posts.text; 

// const like = document.createElement("button"); 




// function renderUserPosts(users) {
//   let cardsContainer = document.querySelector("userCard"); // Reference to the HTML element where the cards should be displayed
//   userCard.innerHTML = ""; // Clear the container before rendering the posts

//   users.forEach(user => {
//     const div = document.createElement("div");
//     const image = document.createElement("img");
//     const name = document.createElement("h3");
//     const text = document.createElement("p");
//     const like = document.createElement("button");
//     const unlike = document.createElement("button");
//     div.classList = "card";
//     image.classList = "card-img";
//     like.classList = "empty";
//     image.src = user.image;
//     name.innerText = `Name: ${user.fullName}`;
//     text.innerText = `Text: ${user.text}`;
//     like.textContent = "like";
//     unlike.textContent = "unlike";
//     div.appendChild(image);
//     div.appendChild(name);
//     div.appendChild(text);
//     div.appendChild(like);
//     div.appendChild(unlike);
//     cardsContainer.appendChild(div);
//   });
// }

// // View all posts using GET
// function viewAllPosts() {
//   let element = document.querySelector("#postArea");
//   fetch("https://microbloglite.herokuapp.com/api/posts")
//     .then(response => response.json())
//     .then(data => {
//       for (let i = 0; i < data.length; i++) {
//         // let row = table.insertRow(-1);
//         // let cell1 = row.insertCell(0);
//         // let cell2 = row.insertCell(1);
//         // cell1.innerHTML = data[i].username;
//         // cell2.innerHTML = data[i].text;
//         renderUserPosts(users)
//       }
//     });
// }