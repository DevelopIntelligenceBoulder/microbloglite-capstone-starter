"use strict"

console.log("Hey...you")

window.onload = () => {

    getUsersPost();

    displayUsersPost();

    let logOutButton = document.querySelector("#logoutButton");

    logOutButton.addEventListener("click", logout);

    let addCommentForm = document.querySelector("#addCommentForm");

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

        console.log(newComment);

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

    let allUserPosts = await getUsersPost();

    allUserPosts.forEach((post) => {

        if (post.username === localStorage.username) {
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

        }
    }
    );



}


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
    console.log(data);

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


