/* Posts Page JavaScript */

"use strict";

console.log("Post JS Loaded")

// Function to get all posts via fetch() 
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
    let element = document.getElementById("postList")

    fetch(apiBaseURL + "/api/posts", options)
        .then(response => response.json())
        .then(data => {
            let html = ''
            for (let index = 0; index < data.length; index += 1) {
                let post = data[index]
                html += `
                <div class="card" style="width: 18rem;">
                <div class="card-header"> <span style="font-weight: bolder;"> ${post.username} </span> </div>
                <img src="..." class="card-img-top" alt="Image Placeholder">
                <div class="card-body">
                  <p class="Likes">Card title</p>
                  <p class="card-text"><span style="font-weight: bolder;">${post.username}</span> : ${post.text}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>`
                element.innerHTML= html
                console.log(html)

            }

        });
}
getAllPosts()