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
  post.forEach((update) => {
    const feed = document.getElementById("feed");

    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const contentElement = document.createElement("p");
    contentElement.innerText = update.text;

    const detailsElement = document.createElement("div");
    detailsElement.classList.add("post-details");
    const usernameElement = document.createElement("span");
    usernameElement.textContent = update.username;
    const timestampElement = document.createElement("span");
    timestampElement.textContent = update.createdAt;

    detailsElement.appendChild(usernameElement);
    detailsElement.appendChild(timestampElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(detailsElement);

    feed.prepend(postElement);
  });
}

// Function to fetch and display all posts

function getAllPosts(content) {
  const loginData = getLoginData();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/api/posts?limit=12", options)
    .then((response) => response.json())
    .then((data) => displayPost(data));
}

// Event listener for the status update form submission
const statusUpdate = document.querySelector("#statusUpdate");
statusUpdate.onsubmit = function (event) {
  event.preventDefault();
  createPost(statusUpdate.statusText.value);
  statusUpdate.statusText.value = "";
};

// Fetch and display posts when the page is initially loaded
document.addEventListener("DOMContentLoaded", getAllPosts);
