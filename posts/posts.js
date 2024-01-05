"use strict";

// imported functions
import { isLoggedIn, getLoginData, logout, addRandomY } from "../auth.js";

window.onload = () => {

    // setTimeout(function(){
    //     location = ''
    //   },2000)

    // if user is not logged in send to home page
    if (!isLoggedIn()) {
        window.location.replace("/");
    }

    // function call for getAllPosts
    getAllPosts();
    // setInterval(getAllPosts, 2000);

    // logout button variable
    let logoutBtn = document.getElementById('logout-btn');
    // event listner for logout button
    logoutBtn.onclick = () => {
        logout();
    }

    addRandomY();

    const moveDeleteBtn = document.getElementById('delete-btn');
    let currectMargin = 0;
    moveDeleteBtn.onclick = () => {
        currectMargin += 100;
        moveDeleteBtn.style.marginTop = `${currectMargin}px`;

    }

}

// initalized variables
const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
const createPostForm = document.getElementById('create-post-form');
const allPosts = document.getElementById('all-posts');
const totalPost = document.getElementById('total-num');


// function to retrieve and display all posts
let getAllPosts = () => {

    const loginData = getLoginData();

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };


    // fetch GET all posts
    fetch(`${apiBaseURL}/api/posts?limit=1000`, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Could not retrieve posts.");
            }
            return res.json();
        })
        .then((posts) => {
            console.log(posts.length);
            let previousLength = posts.length;
            totalPost.innerHTML = `Total number of Posts: <span class='text-white'>${posts.length}</span>`;
            console.log(previousLength);
            if(posts.length > posts.length){
                location.reload();
            }
            // console.log(posts);
            posts.forEach((post)=> {
                
                // console.log(post);
                // formats date into: (MON DD, YYYY, 0:00 AM/PM)
                let date = new Date(post.createdAt);
                let options = {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                };
                let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

                let postCardBody = document.createElement('div');
                postCardBody.classList.add('col-md-4', 'md-card');
                
                postCardBody.innerHTML = `
                    <div class="card border-0 bg-dark rounded-5">
                        <div class="card-body text-white">
                            <p class="card-title">${post.username}</p>
                            <div class="card-text content">${post.text}</div>
                            <p class="card-text fw-lighter">${formattedDate}</p>
                        </div>
                    </div>
                `;

                allPosts.appendChild(postCardBody);
            })
        })
        .catch((err) => console.error(err, 'Error'));
}

// event handler for creating a new post
createPostForm.onsubmit = (e) => {
    e.preventDefault();
    let postText = document.getElementById('post-text').value;

    let postDataContent = {'text': postText};

    const loginData = getLoginData();

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(postDataContent)
    };

    fetch(`${apiBaseURL}/api/posts`, options)     
    .then((res)=>res.json())
    .then((newPostData)=>{

        // formats date into: (MON DD, YYYY, 0:00 AM/PM)
        let date = new Date(newPostData.createdAt);
        let options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        };
        let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        let newPost = document.createElement('div');
        newPost.classList.add('col-md-4', 'md-card');

        newPost.innerHTML = `
       
            <div class="card border-0 bg-dark rounded-5";'>
                <div class="card-body text-white">
                    <p class="card-title">${newPostData.username}</p>
                    <div class="card-text">${newPostData.text}</div>
                    <p class="card-text fw-lighter">${formattedDate}</p>
                </div>
            </div>
       
        `;
        allPosts.prepend(newPost);
        console.log(newPostData);
        
    })
    .catch((err)=> console.error(err));

    createPostForm.reset();

};
