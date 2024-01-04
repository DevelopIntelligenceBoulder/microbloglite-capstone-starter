/* Posts Page JavaScript */
"use strict";
window.onload = () => {
    let logoutBtn = document.getElementById("logout-button");

    logoutBtn.onclick = logout;


    const loginData = getLocalUserData();
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/api/posts", options)
        .then((response) => response.json())
        .then((posts) => {
            console.log(posts); //log grab all post 
            let postsContainer = document.getElementById("posts");
            for (let post of posts) {
                let div = document.createElement("div");
                div.innerHTML = `<p>${post.username} ; ${post.text}</p>`
                postsContainer.appendChild(div);
            }
        });
}