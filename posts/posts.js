/* Posts Page JavaScript */
// fetch all posts from users

//  code for displaying a users name
function displayUserName() {
  const loginData = getLoginData();
  const welcomeMessage = document.querySelector("#welcomeMessage");
  welcomeMessage.textContent = `Welcome, ${loginData.username}`;
}

displayUserName();

// code for the status update box.
var main = function () {
  $(".btn.btn-primary").click(function () {
    var post = $(".status-box").val();
    $("<li>").text(post).prependTo(".posts");
    $(".status-box").val("");
    $(".counter").text("140");
    $(".btn").addClass("disabled");
  });

  $(".status-box").keyup(function () {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $(".counter").text(charactersLeft);

    if (charactersLeft < 0) {
      $(".btn").addClass("disabled");
    } else if (charactersLeft == 140) {
      $(".btn").addClass("disabled");
    } else {
      $(".btn").removeClass("disabled");
    }
  });

  $(".btn").addClass("disabled");
};

$(document).ready(main);

// Function to create a new post
function createPost(content) {
  // Get the current date and time
  const timestamp = new Date().toLocaleString();

  // Create a new post object
  const post = {
    username: displayUserName(), // Replace with your function to get the logged-in username
    content: content,
    timestamp: timestamp,
  };

  // Make an API request to store the post data
  fetch(apiBaseURL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Display the new post in the feed
        displayPost(post);
      } else {
        console.error("Failed to create post.");
      }
    })
    .catch((error) => {
      console.error("Error creating post:", error);
    });
}

// Function to display a post in the feed
function displayPost(post) {
  const feed = document.getElementById("feed");

  // Create a new post element
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  // Create the post content
  const contentElement = document.createElement("p");
  contentElement.textContent = post.content;

  // Create the post details (username and timestamp)
  const detailsElement = document.createElement("div");
  detailsElement.classList.add("post-details");
  const usernameElement = document.createElement("span");
  usernameElement.textContent = post.username;
  const timestampElement = document.createElement("span");
  timestampElement.textContent = post.timestamp;

  // Append the content and details to the post element
  detailsElement.appendChild(usernameElement);
  detailsElement.appendChild(timestampElement);
  postElement.appendChild(contentElement);
  postElement.appendChild(detailsElement);

  // Prepend the new post to the feed
  feed.prepend(postElement);
}

// Event listener for the post button
const postButton = document.getElementById("postButton");
postButton.addEventListener("click", function () {
  const postContent = document.getElementById("postContent").value;
  createPost(postContent);
  // Clear the post content after posting
  document.getElementById("postContent").value = "";
});
