"use strict"

window.onload=()=>{

console.log("Hey user!");

displayPost();

// grabbing the logout link off the HTML
let logOutButton = document.querySelector("#logoutButton");

// Once the Button is clicked the page will run this function
logOutButton.addEventListener("click", logout);


}

const displayPost= async () => {


     // Getting a hold of the container where posts will be displayed
     let postContainer = document.querySelector("#postContainer");

     // Clear previous content if needed
     postContainer.innerHTML = '';
 
     let allPosts = await getPosts();
 
     // running a loop through data to work with it individually 
     allPosts.forEach((post) => {

        
        let date = new Date(post.createdAt).toLocaleString();

         postContainer.innerHTML += `
        <div class="post">
                <span class="username">Username: ${post.username}</span><br>
                <span class="comment">Comment: ${post.text}</span><br>
                <span class="date">Posted at: ${date}</span><br>
            </div><hr>`;
        
        

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
    // console.log(data);

    return data

}
function logout() {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");
            window.localStorage.removeItem("username");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}
