"use strict";

// imported functions
import { isLoggedIn, getLoginData, logout } from "../auth.js";

window.onload = () => {

    // if user is not logged in send to home page
    if (!isLoggedIn()) {
        window.location.replace("/");
    }

    // function call for getAllPosts
    getAllPosts();

    // logout button variable
    let logoutBtn = document.getElementById('logout-btn');
    // event listner for logout button
    logoutBtn.onclick = () => {
        logout();
    }

    addRandomY();

}

// initalized variables
const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
const createPostForm = document.getElementById('create-post-form');
const allPosts = document.getElementById('all-posts');
const loadMoreBtn = document.getElementById('load-more-btn');
const randomY = document.getElementById('random-y');

let listOfYs = [
    "Yodeling yetis yanked your yogurt yesterday.", 
    "Yummy yaks yawned, yelling 'Yoohoo!'",
    "Yellow yak yoga yields youthful yodels.",          
    "Yikes! Yapping yellow yahoos yodel!",
    "Yogurt-loving yeti yells 'Yum!' in yoga class."
]

// function to 'randomly' add a string from listOfYs array to footer
let addRandomY = () =>{
    let randomNum = Math.floor(Math.random() * 5)
    randomY.innerHTML = listOfYs[randomNum];
}

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
    fetch(`${apiBaseURL}/api/posts`, options)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Could not retrieve posts.");
            }
            return res.json();
        })
        .then((posts) => {
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
                            <p class="card-text">${post.text}</p>
                            
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
                    <p class="card-text">${newPostData.text}</p>
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
