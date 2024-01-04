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

    if (userData.bio) {
        profileContainer.querySelector('p').innerText = userData.bio;
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

function editUser() {
    const bioEl = profileContainer.querySelector('p');
    const newBio = prompt('Enter your new bio: ', bioEl.innerText);

    if (newBio) {
        bioEl.innerText = newBio.value;
        userData = getLoginData();
        const currentUsername = userData.username;

        fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${currentUsername}`, {
            method: 'PUT',
            body: JSON.stringify({ bio: newBio }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            }
        })
        .then(res => res.json())
        .then(updatedUserData => {
            console.log(updatedUserData);
            fetchAndDisplayUpdatedUserData(currentUsername);
        })
        .catch((err) => console.error('Error updating bio:', err));
    } else {
        alert("Please enter a valid bio");
    }
}

function fetchAndDisplayUpdatedUserData(currentUsername) {
    // Fetch the updated user data with the new username
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${currentUsername}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    })
    .then(res => res.json())
    .then(retrievedUserData => {
        console.log('Retrieved User Data:', retrievedUserData);
        displayProfile(retrievedUserData);
    })
    .catch((err) => console.error('Error fetching updated user data:', err));
}

function displayProfile(retrievedUserData) {
    console.log('Updated UI with retrievedUserData:', retrievedUserData);

    const bioElement = profileContainer.querySelector('p');

    bioElement.innerText = retrievedUserData.bio; 
}


