/* Posts Page JavaScript */

"use strict";

window.onload = function () {
    document.getElementById("logout").onclick = logout;
    showPosts();
    console.log(loginData())
}

function loginData() {
    let loginData = getLoginData();
    return loginData
}

function showPosts() {
    let opt = {
        // method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(loginData()).token}`
        },
    };

    fetch(api + "/api/posts", opt)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // let x = data.filter( y => y.username = (loginData()).username);
            // console.log(x);
        });
}

function displayCards() {
    document.get
}