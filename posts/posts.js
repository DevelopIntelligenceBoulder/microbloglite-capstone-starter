/* Posts Page JavaScript */

"use strict";

window.onload = () => {

    getPosts();

    getPostsAsyncExample();

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