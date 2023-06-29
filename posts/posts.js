// /* Posts Page JavaScript */
// // fetch all posts from users

// //  code for displaying a users name
// document.addEventListener("DOMContentLoaded", function () {
//   function displayUserName() {
//     const loginData = getLoginData();
//     const welcomeMessage = document.querySelector("#welcomeMessage");
//     welcomeMessage.textContent = `Welcome, ${loginData.username}`;
//   }
//   fetchPosts();
//   displayUserName();
// });
// // Function to create a new post
// function createPost(content) {
//   // Get the current date and time
//   const loginData = getLoginData();
//   const timestamp = new Date().toLocaleString();

//   // Create a new post object
//   const post = {
//     text: content,
//   };

//   // Make an API request to store the post data
//   fetch(apiBaseURL + "/api/posts", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${loginData.token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(post),
//   })
//     .then((response) => response.json())
//     .then((data) => displayPost(data));
// }
// // Function to display a post in the feed
// function displayPost(post) {
//   const feed = document.getElementById("feed");

//   // Create a new post element
//   const postElement = document.createElement("div");
//   postElement.classList.add("post");

//   // Create the post content
//   const contentElement = document.createElement("p");
//   contentElement.innerText = post.text;

//   // Create the post details (username and timestamp)
//   const detailsElement = document.createElement("div");
//   detailsElement.classList.add("post-details");
//   const usernameElement = document.createElement("span");
//   usernameElement.textContent = post.username;
//   const timestampElement = document.createElement("span");
//   timestampElement.textContent = post.createdAt;

//   // Append the content and details to the post element
//   detailsElement.appendChild(usernameElement);
//   detailsElement.appendChild(timestampElement);
//   postElement.appendChild(contentElement);
//   postElement.appendChild(detailsElement);

//   // Prepend the new post to the feed
//   feed.prepend(postElement);
// }

// const statusUpdate = document.querySelector("#statusUpdate");
// statusUpdate.onsubmit = grabText;
// function grabText(event) {
//   event.preventDefault();
//   createPost(statusUpdate.statusText.value);
// }

/* Posts Page JavaScript */
// Fetch all posts from users

// Code for displaying a user's name
function displayUserName() {
  const loginData = getLoginData();
  const welcomeMessage = document.querySelector("#welcomeMessage");
  welcomeMessage.textContent = `Welcome, ${loginData.username}`;
}

displayUserName();

// Function to create a new post
function createPost(content) {
  const loginData = getLoginData();

  const post = {
    text: content,
  };

  fetch(apiBaseURL + "/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => displayPost(data));
}

// Function to display a post in the feed
function displayPost(post) {
  const feed = document.getElementById("feed");

  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const contentElement = document.createElement("p");
  contentElement.innerText = post.text;

  const detailsElement = document.createElement("div");
  detailsElement.classList.add("post-details");
  const usernameElement = document.createElement("span");
  usernameElement.textContent = post.username;
  const timestampElement = document.createElement("span");
  timestampElement.textContent = post.createdAt;

  detailsElement.appendChild(usernameElement);
  detailsElement.appendChild(timestampElement);
  postElement.appendChild(contentElement);
  postElement.appendChild(detailsElement);

  feed.prepend(postElement);
}

// Function to fetch and display all posts
function fetchPosts() {
  fetch(apiBaseURL + "/api/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLoginData().token}`,
    },
  })
    .then((response) => response.json())
  .then((test => console.log(test)))}
//     .then((data) => {
//       if (data.success) {
//         const posts = data.posts;
//         feed.innerHTML = "";

//         posts.forEach((post) => {
//           displayPost(post);
//         });
//       } else {
//         console.error("Failed to fetch posts.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching posts:", error);
//     });
// }

// Event listener for the status update form submission
const statusUpdate = document.querySelector("#statusUpdate");
statusUpdate.onsubmit = function (event) {
  event.preventDefault();
  createPost(statusUpdate.statusText.value);
  statusUpdate.statusText.value = "";
};

// Fetch and display posts when the page is initially loaded
document.addEventListener("DOMContentLoaded", fetchPosts);
