/* Posts Page JavaScript */

"use strict";

window.onload = () => {

    getPosts();

    getPostsAsyncExample();

    const logOutButton = document.querySelector("#logOutButton");

    logOutButton.addEventListener("click", logout)



}


const getPosts = () => {

    const loginData = getLoginData();

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            //do something with the posts
            console.log(data, "Using Promises")
        })

}

const getPostsAsyncExample = async () => {

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
    console.log(data, "using async/await")

}

    // This is the `logout()` function you will use for any logout button
    // which you may include in various pages in your app. Again, READ this
    // function and you will probably want to re-use parts of it for other
    // `fetch()` requests you may need to write.
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

                window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
                window.location.assign("/");  // redirect back to landing page
            });
    }
