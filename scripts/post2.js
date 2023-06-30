"use strict"

const postContent = document.getElementById("postContent");
const postBtn = document.getElementById("Bttnpostsubmit");

const loginData = getLoginData();
const token = loginData.token;
const username = loginData.username;




window.onload = () => {
    console.log("Post2.js Initialized")
    

    postBtn.onclick = onPostBtnClicked;
    getPosts()

}

function getPosts() {
    //fetch request for all posts (return post)
    fetch("https://microbloglite.herokuapp.com/api/posts?limit=10000", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then(response => response.json())
        .then(posts => {
            console.log(posts);
            generatePostCard(posts)
        })
}

function onPostBtnClicked() {
    let bodyData = {
        text: postContent.value
    }
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then(response => {
            console.log(response);
           return response.json()
        })
        .then(post => {
            console.log(post);
            getPosts();
        })
        .catch( error => {
            console.log(error);
        })
}




//function to make card for each post (with post parameter from fetch request)
function generatePostCard(posts) {
    const postCardContainer = document.getElementById("postCardsContainer");
  
    // Clear existing post cards from the container
    postCardContainer.innerHTML = "";
  
    // Iterate over the posts array in reverse order to display them from newest to oldest
    for (let i = posts.length - 1; i >= 0; i--) {
      let post = posts[i];
      let postCard = createPostCard(post);
      postCardContainer.appendChild(postCard);
    }
  }
  
  function createPostCard(post) {
    // Create the card element and set its properties
    let postCard = document.createElement("div");
    postCard.className = "card";
    postCard.style.width = "30rem";
    postCard.style.backgroundColor = "rgb(249, 249, 249)";
    postCard.style.marginTop = "1%";
    postCard.style.paddingTop = "1%";
    postCard.style.paddingBottom = "1%";
    postCard.style.borderRadius = "20px";
    postCard.style.opacity = 0; // Set initial opacity to 0 (Make the card invis while its "offscreen")
    postCard.style.transform = "translateX(-100%)"; // Set initial position outside the viewport
    postCard.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
  
    // Create a card body
    let postBodyDisplay = document.createElement("div");
    postBodyDisplay.className = "card-body";
  
    // Create a p tag for the username
    let userNameDisplay = document.createElement("p");
    userNameDisplay.className = "card-text";
    userNameDisplay.textContent = "@" + post.username;
  
    // Create a p tag for the post content
    let postContent = document.createElement("p");
    postContent.className = "card-text";
    postContent.textContent = post.text;
  
    // Create a p tag for the post time
    let postTimeDisplay = document.createElement("p");
    postTimeDisplay.className = "card-text";
    postTimeDisplay.textContent = `${new Date(post.createdAt).toDateString()}, ${new Date(post.createdAt).toLocaleTimeString()}`;
  
    // Append all of the previous elements to the card body
    postBodyDisplay.appendChild(userNameDisplay);
    postBodyDisplay.appendChild(postContent);
    postBodyDisplay.appendChild(postTimeDisplay);
  
    // Append the card body and its contents to the card
    postCard.appendChild(postBodyDisplay);
  
    // Utilize an "onScroll" event to slide the cards in from the left when they become visible
    window.addEventListener("scroll", () => {
      const cardRect = postCard.getBoundingClientRect(); // returns the rectangular "dimensions" of the object
      const windowBottom = window.innerHeight; // sets the height of the entire window to windowBottom
  
      // If the top of the card is less than the height of the viewport then make it visible and slide it into the middle of the screen
      if (cardRect.top < windowBottom) {
        postCard.style.opacity = 1;
        postCard.style.transform = "translateX(50%)";
      }
    });
  
    // Return the created card
    return postCard;
  }
  