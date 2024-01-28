/* Posts Page JavaScript */

"use strict";



console.log("Post JS Loaded")
window.onload = function (_event) {
  getAllPosts()
}

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

  fetch(apiBaseURL + "/api/posts?limit=5000", options)
    .then(response => response.json())
    .then(data => {
      let html = ''
      for (let index = 0; index < data.length; index += 1) {
        let post = data[index]
        
        if (post.username.includes("Smurf") && post.text.includes("pic" || "Pic")) {
          // let profilePage = ''
          // switch (post.username){
          //   case 'Brainy_Smurf':
          //      profilePage += "http://127.0.0.1:5500/profile/index2.html" 
          //   case 'Smurf_Blossom':
          //      profilePage += "http://127.0.0.1:5500/profile/index3.html"
          //   case 'Clumsy_Smurf':
          //       profilePage += "http://127.0.0.1:5500/profile/index5.html"
          //   case 'Smurfette':
          //       profilePage += "http://127.0.0.1:5500/profile/index4.html"
          // }

          html += `
                          <br><br>
                          <div class="d-flex justify-content-center">
                          <div class="card" style="width: 50rem;">
                            <a class="card-header" href="http://127.0.0.1:5500/profile/${post.username}.html"><span style="font-weight: bolder;"> ${post.username} </span> </a>
                            <div class="card-body">
                            <p class="Likes"><span style="font-weight: bolder;">Likes: ${post.likes.length}</span></p>
                            <p class="card-text"><a href="http://127.0.0.1:5500/profile/${post.username}.html" style="color:inherit"><span style="font-weight: bolder;">${post.username}</span></a> : ${post.text}</p>
                            <img src="/posts/Images/${post.username}.jpeg" class="card-img-top" alt="Image Placeholder">
                            <button onclick="addLike(${post._id})">Like Post</button>
                            <button >Unlike Post</button>
                            </div>
                            </div>
                            </div>
                            <br><br>
                            `

        }
        else if (post.username.includes("Smurf") && !post.text.includes("Pic" || "pic")) {
          
          html += `
                      <br><br>
                      <div class="d-flex justify-content-center">
                      <div class="card" style="width: 50rem;">
                        <a class="card-header" href="http://127.0.0.1:5500/profile/${post.username}.html"><span style="font-weight: bolder;"> ${post.username} </span> </a>
                        <div class="card-body">
                        <p class="Likes"><span style="font-weight: bolder;">Likes: ${post.likes.length}</span></p>
                        <p class="card-text"><a href="http://127.0.0.1:5500/profile/${post.username}.html" style="color:inherit"><span style="font-weight: bolder;">${post.username}</span></a> : ${post.text}</p>
                        <button onclick = "addLike()">Like Post</button>
                        <button>Unlike Post</button>
                        </div>
                        </div>
                        </div>
                        <br><br>
                        `
        }


        element.innerHTML = html


        /* ****DELETE AND REDO PAPA SMURF USER INFO!!!!*****

        1) Create Usernames for each Smurf
        2) Connect username to profile 
        3) filter picturs by checking if string includes the word "pic"
        3) Practice filtering to only show smurf profiles 
        4) Use Ai to generate website brand Icon
        5) stretch goal is to figure out how to have profile reflect current logged in user 

      */

      }


    });
}

function addLike(postId) {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  // note: the api variable is defined in auth.js
  let bodyData = {
    postId: document.getElementById()
  }
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", options, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type":
      "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {

      console.log(json.username)

    })
}
