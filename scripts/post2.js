"use strict"

postContent = document.getElementById("postContent")

const loginData = getLoginData();
const token = loginData.token;
const username = loginData.username;




window.onload = () => {
    console.log("Post2.js Initialized")
    

    getPosts()

}

function getPosts() {

    //fetch request for all posts (return post)
    fetch("https://microbloglite.herokuapp.com/api/posts", {
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
        .then(response => response.json())
        .then(post => {
            console.log(post);
        })
}




//function to make card for each post (with post parameter from fetch request)
function generatePostCard(posts) {
    const postCardContainer = document.getElementById("postCardsContainer");
  
    // make the cards and set a delay for each
    for (let post of posts) {
      const delay = post * 400; // Adjust the delay time (in milliseconds)
  
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
      
      //Make a card body
      let postBodyDisplay = document.createElement("div");
      postBodyDisplay.className = "card-body";
      
      //make a p tag for the username
      let userNameDisplay = document.createElement("p");
      userNameDisplay.className = "card-text";
      userNameDisplay.textContent = "@" + post.username;
      
      //Make a p tag for the post content
      let postContent = document.createElement("p");
      postContent.className = "card-text";
      postContent.textContent = post.text;
      
      //Make a p tag for the post time
      let postTimeDisplay = document.createElement("p");
      postTimeDisplay.className = "card-text";
      postTimeDisplay.textContent = `${new Date(post.createdAt).toDateString()}, ${new Date(post.createdAt).toLocaleTimeString()}`;
      

     // Append all of the previous elements to the card body
      postBodyDisplay.appendChild(userNameDisplay);
      postBodyDisplay.appendChild(postContent);
      postBodyDisplay.appendChild(postTimeDisplay);
    
      //Append the card body and its contents to the container div hardcoded into the HTML
      postCard.appendChild(postBodyDisplay);
      postCardContainer.appendChild(postCard);
  
      // Utilize the delay above combined with an "onScroll" event to slide the cards in from the left
      window.addEventListener("scroll", () => {
        //
        const cardRect = postCard.getBoundingClientRect(); // returns the rectangular "dimensions" of the object
        const windowBottom = window.innerHeight; // sets the height of the entire window to windowBottom
  
        // If the top of the card is less than the height of the viewport then make it visible and slide it into the middle of the screen
        if (cardRect.top < windowBottom) {
          postCard.style.opacity = 1;
          postCard.style.transform = "translateX(50%)";
        }
      });
    }
  }
  
  

//like button if I feel like it