"use strict"

console.log("Hey...you")

window.onload = () => {

    getUsersPost();

    displayUsersPost();

    // grabbing the logout link off the HTML
    let logOutButton = document.querySelector("#logoutButton");

    // Once the Button is clicked the page will run this function
    logOutButton.addEventListener("click", logout);

    // grabbing the comment section form from HTML
    let addCommentForm = document.querySelector("#addCommentForm");

    //when user inputs text they are able to create a new comment when his function is ran
    addCommentForm.addEventListener("submit", addANewComment);

}
const addANewComment = async (event) => {

    //calling preventDefault to keep the page from reloading
    event.preventDefault();

    //generating the new data object
    //whenever event is activated by user meaing that user clicks the "add to list" button, it will create an object using the value from the user
    let formData = new FormData(event.target);

    //generating a Javascript object from the formdata object created above
    let formDataAsObject = Object.fromEntries(formData);

    
    const loginData = getLoginData();

    try {
        //making a fetch POST request to add a user in the api
        let response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts`, {
            method: "POST",
            headers: { 
                 Authorization: `Bearer ${loginData.token}`,
                "Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(formDataAsObject),
        });

        //turning the response into something that we can work with
        let newComment = await response.json();

        // console.log(newComment);

         window.location.href = "index.html"

    } catch (err) {
        console.log("This wont work");
        throw new Error(err)
    }
}

const displayUsersPost = async () => {

     // Getting a hold of the container where posts will be displayed
     let postContainer = document.querySelector("#postContainer");

     // Clear previous content if needed
     postContainer.innerHTML = '';
 
    //  calling the fetch request made with avaliable data
     let allUserPosts = await getUsersPost();
 
    // running a loop through data to work with it individually 
     allUserPosts.forEach((post) => {

        // display data in a prettier way
        let date = new Date(post.createdAt).toLocaleString();

        if (post.username === localStorage.username){
         postContainer.innerHTML += `
        <div class="post">
                <span class="username">Username: ${post.username}</span><br>
                <span class="comment">Comment: ${post.text}</span><br>
                <span class="date">Posted at: ${date}</span><br>
            </div><hr>`;
        
        }
        

     });

}

// calling the data from the API
const getUsersPost = async () => {

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


