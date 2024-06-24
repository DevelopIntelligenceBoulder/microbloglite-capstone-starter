"use strict"

window.onload=()=>{

console.log("Hey user!")

getPosts();

displayPost();

}
const displayPost= async () => {

    // //getting a hold of the divs where the username, comment and time will go
    // let userName= document.querySelector("#usersPost");

    // let comment = document.querySelector("#userComment");

    // let displayTime = document.querySelector("#timeOfPost");

    // let allPosts = await getPosts();

    // allPosts.forEach((post) => {

    //     userName.innerHTML= post.username

    //     comment.innerHTML= post.text

    //     displayTime.innerHTML= post.createdAt
        
        
    // });

     // Getting a hold of the container where posts will be displayed
     let postContainer = document.querySelector("#postContainer");

     // Clear previous content if needed
     postContainer.innerHTML = '';
 
     let allPosts = await getPosts();
 
     allPosts.forEach((post) => {
         // Create elements for each post
         let postDiv = document.createElement('div');
         postDiv.classList.add('post');

         let userName = document.createElement('p');
         userName.classList.add('username');

         let comment = document.createElement('p');

         let displayTime = document.createElement('p');
         displayTime.classList.add('createdAt');
 
         // Assign values to the elements
         userName.textContent = `Username: ${post.username}`;
         comment.textContent = `Comment: ${post.text}`;
         displayTime.textContent = `Posted at: ${post.createdAt}`;
 
         // Append elements to the post container
         postDiv.appendChild(userName);
         postDiv.appendChild(comment);
         postDiv.appendChild(displayTime);
 
         postContainer.appendChild(postDiv);
     });
    





}

// gets all the post from the API to then display
const getPosts = async () => {

    const loginData = getLoginData();

    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`
        }
    })

    const data = await response.json();

    //do something with the posts
    console.log(data);

    return data

}
