/* Posts Page JavaScript */

"use strict";

console.log("IM WORKING")
//maybe have nav bar in html?


//load all posts
// function getPosts() {   

//     fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
//         headers: {
//             'Authorization': `Bearer ${getLoginData().token}`
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(displayPosts(data));
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }
// function displayPosts (data){
//     const resultDiv = document.getElementById('allPosts')
//     html = ''
//     for (let index = 0; index < data.length; index += 1) {
//         const posts = data[index];
//     html += ` <div class="card" style="width: 18rem;">
//     <div class="card-body">
//         <h5 class="card-header"> ${posts.name}</h5>
//     </div>
// </div>`;
// }

//     resultDiv.innerHTML = html
// }

//make function for fetch request
//it's POST REQUEST
//for /api/posts
//include in headers "Authorization": "Bearer ${token}"
//get token by looking in Auth JS at getLoginData and figuring how that function working

//after fetch function, have funciton that LOOPS through data gotten by fetch function
//so like let html = ""
// for (blah blah blah)
//html += `html that makes post cards`
//innerhtml = html
//done :D