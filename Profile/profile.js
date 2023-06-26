"use strict";

const bio = document.getElementById("bio");
const postDescription = document.getElementById("postDescription");
const postBtn = document.getElementById("postBtn");
const postPage = document.getElementById("postPage");
const logOut = document.getElementById("logOut");

const loginData = getLoginData();
const token = loginData.token;


window.onload = function () {
    console.log("window loaded")

    postBtn.onclick = onPostBtnClick;
    logOut.onclick = onLogoutClick

}

function onPostBtnClick() {
    //create a new todo using the API!

    // Create JSON object to include in the request body


    let bodyData = {


        "text": postDescription.value


    }


    // Send the request
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        },
    })
        .then(response => response.json())
        .then(post => {
            // If the POST finishes successfully, display a message

            console.log(post)
            window.location.replace("../posts/index.html");


        });

}



function onLogoutClick() {
  logout();
}


