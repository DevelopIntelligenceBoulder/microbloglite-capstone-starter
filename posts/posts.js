/* Posts Page JavaScript */

"use strict";



console.log("Post JS Loaded")
window.onload = function(_event) {
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

    fetch(apiBaseURL + "/api/posts", options)
        .then(response => response.json())
        .then(data => {
            let html = ''
            for (let index = 0; index < data.length; index += 1) {
                let post = data[index]

                /*if(post.username === "tinyteeny"){
                  html += '<img src="https://fakeimg.pl/600x400" class="card-img-top" alt="Image Placeholder">'
                }
                
                else {
                */
                  html += `
                  <br><br>
                  <div class="d-flex justify-content-center">
                  <div class="card" style="width: 50rem;">
                    <a class="card-header" href="#"><span style="font-weight: bolder;"> ${post.username} </span> </a>
                    <div class="card-body">
                    <img src="https://fakeimg.pl/600x400" class="card-img-top" alt="Image Placeholder">
                    <p class="Likes"><span style="font-weight: bolder;">Likes: ${post.likes.length}</span></p>
                    <p class="card-text"><a href="#" style="color:inherit"><span style="font-weight: bolder;">${post.username}</span></a> : ${post.text}</p>
                    </div>
                    </div>
                    </div>
                    <br><br>
                    `
                

               
                element.innerHTML= html
             /*
                    
             switch(post.username){
              case 'BiancaT':
                html += <img src="https://fakeimg.pl/600x400" class="card-img-top" alt="Image Placeholder">
                  break;
              case 'smurf2':
                html += <img src = "smurf2Pic";
                  break;
             }
             case 'smurf3':
                html += <img src = "smurf3Pic";
                  break;
             }
             default:
              Default DIV 

            */
               
            }
           

        });
}
