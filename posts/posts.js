

"use strict";



const logoutButton = document.getElementById("logoutButton");

const usersPostCard = document.getElementById("usersPostCard");

const buttonContainer = document.getElementById('buttonContainer');


window.onload = () => {
    console.log("hello");

    buttonContainer.onclick = handleClick;

    getAllPosts();

    logoutButton.onclick = logout;

    console.log("click");

}




function getAllPosts() {
    // GET /api/users
    const loginData = getLoginData();
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };
    // note: the api variable is defined in auth.js
    fetch(apiBaseURL + "/api/posts", options)
        .then(response => response.json())
        .then(posts => {
            // Do something with the users array...
            console.log(posts);
            buildUserPostsCard(posts);
        });
}


// function to build userPostCard

function buildUserPostsCard(posts) {

    // for of loop ,
    for (let post of posts) {

        //create img tag element for user profile image
        let userImage = document.createElement("img");
        userImage.src = "https://github.com/michaeljean3456.png";
        userImage.style.width = "50px";
        userImage.style.height = "50px"


        //creates div element with class card 
        let divCard = document.createElement("div");
        divCard.className = "card";
        // Create a div element for the card body
        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        // Create a paragraph element for the username
        let cardUserName = document.createElement("p");
        cardUserName.className = "card-text";
        cardUserName.textContent = "@" + post.username;
        // Create a paragraph element for the post content
        let cardUserContent = document.createElement("p");
        cardUserContent.className = "card-text";
        cardUserContent.textContent = post.text;
         // Create a paragraph element for the post timestamp
        let cardUserTimeStamp = document.createElement("p");
        cardUserTimeStamp.className = "card-text";
        cardUserTimeStamp.textContent = `${new Date(post.createdAt).toDateString()} , ${new Date(post.createdAt).toLocaleTimeString()}`;
        // Append user image, username, content, and timestamp to the card body
        divCardBody.appendChild(userImage);
        divCardBody.appendChild(cardUserName);
        divCardBody.appendChild(cardUserContent);
        divCardBody.appendChild(cardUserTimeStamp);


         // Create a like button element
        let likeButton = document.createElement("svg");
        likeButton.className = "like-button";
        likeButton.value = post._id;
        likeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/></svg>';
        likeButton.addEventListener("click", () => handleLike(post._id, likeButton));
        // Check if the post is liked by the user and update the like button accordingly
        const isLiked = localStorage.getItem(post._id) === "true";
        updateLikeButton(likeButton, isLiked);



        // Append the path element to the SVG element
        

        // Append the SVG element to the desired container
        // Append the like button to the card bod
        divCardBody.appendChild(likeButton);

        // Create a span element for displaying the number of likes
        let numberOfLikes = document.createElement("span");
        numberOfLikes.className = "card-text";
        numberOfLikes.textContent = post.likes.length;
         // Append the number of likes to the like button
        likeButton.appendChild(numberOfLikes);

        // Create a delete button for deleting the post
        let deletePost = document.createElement("button");
        deletePost.value = post._id;
        deletePost.id = ("deleteButton");
        deletePost.textContent = "Delete";
        deletePost.onclick = () => deletePostForUser(deletePost.value);

          // Append the delete button to the card body
        divCardBody.appendChild(deletePost);
         // Append the card body to the card
        divCard.appendChild(divCardBody);
        // Append the card to the container (assuming 'usersPostCard' is the container element)
        usersPostCard.appendChild(divCard);
    }

}

function handleLike(postId, likeButton) {


    console.log("hello");
    // Get the like count element
    const likeCountElement = likeButton.querySelector("span.card-text");

    // Retrieve the current like count
    let likeCount = parseInt(likeCountElement.textContent);

    // Toggle the like state
    const isLiked = !likeButton.classList.contains("liked");
    updateLikeButton(likeButton, isLiked);

    if (isLiked) {
        likeCount++;
    } else {
        likeCount--;
    }
    
    likeCountElement.textContent = likeCount.toString();

    // Save the like state in localStorage
    localStorage.setItem(postId, isLiked.toString());
}

function updateLikeButton(likeButton, isLiked) {
    if (isLiked) {
        likeButton.classList.add("liked");
        likeButton.querySelector("path").setAttribute("fill", "red");
    } else {
        likeButton.classList.remove("liked");
        likeButton.querySelector("path").removeAttribute("fill");
    }
}

function handleClick(likeButton) {
    const postId = likeButton.value;
    const loginData = getLoginData();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify({ postId }),
    };

    fetch(apiBaseURL + "/api/likes", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

        })
        .catch((error) => console.error(error));


    // Toggle the like state
    const isLiked = toggleLike(likeButton);

    // Update the fill color based on the like state
    const pathElement = likeButton.querySelector("path");
    if (isLiked) {
        pathElement.setAttribute("fill", "red");

    } else {
        pathElement.removeAttribute("fill");
    }
}

function toggleLike(likeButton) {
    // Retrieve the current like state from the data attribute
    let isLiked = likeButton.getAttribute("data-liked") === "true";

    // Toggle the like state
    isLiked = !isLiked;

    // Update the data attribute with the new like state
    likeButton.setAttribute("data-liked", isLiked);

    return isLiked;
}




function deletePostForUser(theId) {
    console.log(theId);
    const loginData = getLoginData();
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/api/posts/" + theId, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(error => console.error(error));
}

