"use strict";

const profileContainer = document.getElementById('profile');

let userData;

window.onload = function() {
    const postbtn = document.querySelector('#postBtn');
    postbtn.onclick = addPost;
 
    userData = getLoginData();


    if (userData.username) {
        profileContainer.querySelector('h2').innerText = userData.username;
    }

    const editBtn = document.getElementById("editBtn");
    editBtn.onclick = editUser;
}


function addPost(e) {
    e.preventDefault();
    
    const textareaContent = document.querySelector('#textarea');

    const bodyData = {
        text: textareaContent.value,
    };

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST', 
        body: JSON.stringify(bodyData),

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }

    })
    .then(response => response.json())
    .then(createPost =>{
        console.log(createPost);
        textareaContent.value = '';
    })
}


function editUser(){

    const usernameEl = document.querySelector('h2');

    const newUsername = prompt('Enter you new username: ', usernameEl.innerText);
    
    if (newUsername !== null && newUsername.trim() !== ''){
        usernameEl.innerText = newUsername;

        const userData = getLoginData();

        const currentUsername = userData.username;

        fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${currentUsername}`, {
            method: 'PUT',
            body: JSON.stringify({ username: newUsername}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`
                }
        })
        .then(res => res.json())
        .then(updatedUserData => {
            // DISPLAY UPDATED USER
            console.log(updatedUserData)})
            displayProfile(updatedUserData)
        .catch((err) => console.error('Error update username:', err));

    }else{
        alert("Please enter a valid username");
    }
}


function displayProfile(updatedUserData){
    
    // go into updatedUserData retrive username = pdatedUserData.username 

    // make a fetch request with username just like the put u did - GET REQUEST TO GET UODATED USERNAME 
    
}

