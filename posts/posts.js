/* Posts Page JavaScript */

"use strict";

const logoutButton = document.querySelector("#logout")
const postContainer = document.querySelector('#postContainer')
logoutButton.onclick = logout

function postFetch () {
    const loginData = getLoginData();
  console.log(loginData.token)
    
    const options = { 
        method: "GET",
        headers: { 
            
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/api/posts", options)
        .then(response => response.json())
        .then(posts => posts.forEach(post => 
            {const pContainer = document.createElement("p")
            pContainer.innerText = post.text
            postContainer.append(pContainer)}
             )
        
        )
            
        
        
}

postFetch()


