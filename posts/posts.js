

"use strict";



const logoutButton = document.getElementById("logoutButton");

const usersPostCard = document.getElementById("usersPostCard");

window.onload = () => {
    console.log("hello");

    getAllPosts();
    logoutButton.onclick = logout;
    console.log("click");

}

// function onLogoutClick(){
//     logout();
// }



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





function buildUserPostsCard(posts) {
    for (let post of posts) {
        let divCard = document.createElement("div");
        divCard.className = "card";

        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        let cardUserName = document.createElement("p");
        cardUserName.className = "card-text";
        cardUserName.textContent = "username@_" + post.username;

        let cardUserContent = document.createElement("p");
        cardUserContent.className = "card-text";
        cardUserContent.textContent = "Content: " + post.text;

        let cardUserTimeStamp = document.createElement("p");
        cardUserTimeStamp.className = "card-text";
        cardUserTimeStamp.textContent = "Updates: " + post.updatedAt;

        divCardBody.appendChild(cardUserName);
        divCardBody.appendChild(cardUserContent);
        divCardBody.appendChild(cardUserTimeStamp);

        let likeButton = document.createElement("button");
        likeButton.className = "btn btn-primary";
        likeButton.textContent = "Like";




        divCardBody.appendChild(likeButton);


        divCard.appendChild(divCardBody);
        usersPostCard.appendChild(divCard);
    }

}

