"use strict";

const logoutBtn = document.getElementById("logoutBtn");
const commentBtn = document.getElementById("commentBtn");
const userCard = document.getElementById("userCard");
const createPostsBtn = document.getElementById("createPostsBtn");
const createNewPostBtn = document.getElementById("createNewPostBtn");

/*----------------USER NEEDS TO BE LOGGED IN BEFORE ENTERING -------------------*/
// function isLoggedIn () {
//   const loginData = getLoginData();
//   return Boolean(loginData.token);
// }

// if (isLoggedIn() === false) {
//   window.location.replace("/");
// } else {
//     window.location.reload()
//   }

/*---------------PAGE LOADS IF USER IS LOGGED IN----------------------*/
window.onload = function () {
  console.log("Page is loading....");
   logoutBtn.onclick = logoutBtnClicked;
   //commentBtn.onclick = commentBtnClicked;
  //createPostsBtn.onclick = createPostsBtnClicked;
  //createNewPostBtn.onclick = createNewPostBtnClicked;
};

//button functionality 
function likeBtnClicked2(post, likeBtnSvg, unlikeBtnSvg) {
  console.log("likeBTN has been clicked");
  likeBtnSvg.style.display = "none";
  unlikeBtnSvg.style.display = "block";
  console.log("clicked");
}
function unLikeBtnClicked2(post, unlikeBtnSvg, likeBtnSvg) {
  console.log("Unliked :(")
  unlikeBtnSvg.style.display = "none"
  likeBtnSvg.style.display = "block"
}

/*--------------------USER IS ABLE TO COMMENT ON A POST------------------------ */
// function commentBtnClicked() {
//   // Get the username and text from the input fields
//   const username = document.getElementById("usernameIdField").value;
//   const text = document.getElementById("textIdField").value;
//   const createdAt = document.getElementById("createdAtIdField").value;
//   // Create the post object
//   const newPost = {
//     username: username,
//     text: text,
//     created: createdAt,
//   };
//   // Set the authentication token
//   let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNlcmVhbGFuZE1pbGsiLCJpYXQiOjE2ODgwMjA2ODAsImV4cCI6MTY4ODEwNzA4MH0.L51BoEVowCeLLxLlTKXQsbR38lYMDi5uBEBJd3iF1Po";
//   // Set the request options
//   let options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(newPost)
//   };
//   // Send the POST request to create a new post
//   fetch("https://microbloglite.onrender.com/api/posts", options)
//     .then(response => response.json())
//     .then(createdPost => {
//       console.log("New post created:", createdPost);
//       // Do something with the created post, such as displaying it on the page
//     })
//     .catch(error => {
//       console.error("Interesting...It looks like there was an error creating new post:", error);
//     });
// }
// function viewAllPosts() {
// }

/*----------------------VIEW ALL POSTS-----------------------*/
let authToken = getLoginData().token; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNpYWVhdHMiLCJpYXQiOjE2ODgwNjMyNjgsImV4cCI6MTY4ODE0OTY2OH0.XdXoqW9dDsl4XuHW27K0CBq2HJLwkp-ctdbyQNIAHKc" //this will need to be retreived from web storage, the login page should have put it in place.   At page startup if the user is not logged in with a valid token they should have
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
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row");
    let cardsInRow = 0;

    //posts.filter(post => post.text.includes('Matt')).forEach (post => {


    
    
   // posts.filter(post => post.text.toUpperCase().includes('MATT')).forEach(post => {
      posts.forEach(post => {
      // Create the outermost elements
      const colDiv = document.createElement("div");
      colDiv.classList.add("container", "col-4", "mt-3");
      const postsCardDiv = document.createElement("div");
      postsCardDiv.id = "postsCard";
      postsCardDiv.classList.add("p-4", "p-md-5", "border", "rounded-3", "bg-body-tertiary", "shadow");
      // Create the heading
      const heading = document.createElement("h2");
      heading.textContent = post.username;
      // Create the paragraph
      const paragraph = document.createElement("p");
      paragraph.textContent = post.text;
      // Create the horizontal rules
      const hr1 = document.createElement("hr");
      const hr2 = document.createElement("hr");
      // Create the SVG icons
      const unlikeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // unlikeBtnSvg.id = "unlikeBtn";
      unlikeBtnSvg.onclick = function () { unLikeBtnClicked2(post, unlikeBtnSvg, likeBtnSvg); };
      unlikeBtnSvg.type = "button";
      unlikeBtnSvg.setAttribute("width", "50");
      unlikeBtnSvg.setAttribute("height", "50");
      unlikeBtnSvg.setAttribute("fill", "currentColor");
      unlikeBtnSvg.classList.add("bi", "bi-chat-heart-fill", "btn");
      unlikeBtnSvg.setAttribute("viewBox", "0 0 16 16");
      unlikeBtnSvg.innerHTML = '<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>';
      const likeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      //likeBtnSvg.id = "likeBtn";
      likeBtnSvg.onclick = function () { likeBtnClicked2(post, likeBtnSvg, unlikeBtnSvg); };
      likeBtnSvg.type = "button";
      likeBtnSvg.setAttribute("width", "50");
      likeBtnSvg.setAttribute("height", "50");
      likeBtnSvg.setAttribute("fill", "currentColor");
      likeBtnSvg.classList.add("bi", "bi-chat-heart", "btn");
      likeBtnSvg.setAttribute("viewBox", "0 0 16 16");
      likeBtnSvg.innerHTML = '<path fill-rule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>';
      const commentBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      commentBtnSvg.setAttribute("id", "commentBtn");
      commentBtnSvg.setAttribute("type", "button");
      commentBtnSvg.setAttribute("width", "26");
      commentBtnSvg.setAttribute("height", "26");
      commentBtnSvg.setAttribute("fill", "currentColor");
      commentBtnSvg.classList.add("bi", "bi-chat-text-fill");
      commentBtnSvg.setAttribute("viewBox", "0 0 16 16");
      commentBtnSvg.innerHTML = '<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />';
      // Add the commentBtnSvg to your desired container or append it to the document body
      // Append the elements to their respective parent elements
      postsCardDiv.appendChild(heading);
      postsCardDiv.appendChild(hr1);
      postsCardDiv.appendChild(paragraph);
      postsCardDiv.appendChild(hr2);
      postsCardDiv.appendChild(unlikeBtnSvg);
      postsCardDiv.appendChild(likeBtnSvg);
      postsCardDiv.appendChild(commentBtnSvg);
      unlikeBtnSvg.style.display = "none"
      colDiv.appendChild(postsCardDiv);
      cardContainer.appendChild(colDiv);
      cardsInRow++;
      if (cardsInRow === 3) {
        postContainer.appendChild(cardContainer);
      }
    });
    // Append any remaining cards
    if (cardsInRow > 0) {
      postContainer.appendChild(cardContainer);
    }
  })
  .catch(error => {
    console.error("An error occurred:", error);
    appendChild(cardContainer);
  });
//})
/*-----------------CREATE A NEW POST USING POST--------------------------------------------------------*/
function createNewPost() {
  let bodyData = {
    username: document.getElementById("usernameIdField").value,
    text: document.getElementById("textIdField").value,
    likes: document.getElementById("likesIdField").value,
    createdAt: document.getElementById("createdAtIdField").value,
  };
  let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNpYWVhdHMiLCJpYXQiOjE2ODgwNjMyNjgsImV4cCI6MTY4ODE0OTY2OH0.XdXoqW9dDsl4XuHW27K0CBq2HJLwkp-ctdbyQNIAHKc";
  let options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json" // Add the content type header
    },
    body: JSON.stringify(bodyData) // Convert the bodyData to JSON string
  };
  fetch("https://microbloglite.onrender.com/api/posts", options)
    .then(response => {
      console.log("Creating a new post...");
      return response.json();
    })
    .then(createdPost => {
      console.log("New Post Created", createdPost);
      const postsContainer = document.getElementById("postsContainer");
      const postElement = document.createElement("div");
      postElement.innerHTML = `
        <h3>${createdPost.username}</h3>
        <p>${createdPost.text}</p>
        <p>Created at: ${createdPost.created}</p>
      `;
      postsContainer.appendChild(postElement);
      // If the POST finishes successfully, ...
      let confirmationMessage = document.getElementById("confirmationMessage");
      confirmationMessage.textContent = "New Post Added";
      confirmationMessage.style.display = 'block';
    })
    .catch(error => {
      // If the POST returns an error, ...
      let confirmationMessage = document.getElementById("confirmationMessage");
      confirmationMessage.innerHTML = "Interesting... It looks like you are unable to submit a post at the moment";
    });
}
/*---------------------------------LOGS OUT USER WHEN CLICKED-------------------------------------------------------------------*/

function logoutBtnClicked () {
   const loginData = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaWNpYWVhdHMiLCJpYXQiOjE2ODgwNjMyNjgsImV4cCI6MTY4ODE0OTY2OH0.XdXoqW9dDsl4XuHW27K0CBq2HJLwkp-ctdbyQNIAHKc"
  // // GET /auth/logout
  const options = {
       method: "GET",
     headers: {
  //         // This header is how we authenticate our user with the
  //         // server for any API requests which require the user
  //         // to be logged-in in order to have access.
  //         // In the API docs, these endpoints display a lock icon.
         Authorization: `Bearer ${loginData.token}`,
      },
  };
   fetch("https://microbloglite.onrender.com/auth/logout", options)
     .then(response => response.json())
     .then(data => console.log(data))
      .finally(() => {
//             // We're using `finally()` so that we will continue with the
//             // browser side of logging out (below) even if there is an
//             // error with the fetch request above.
            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}
// logout();