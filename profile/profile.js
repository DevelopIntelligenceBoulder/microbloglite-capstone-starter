"use strict";

let userData; 

window.onload = function() {
    const postbtn = document.querySelector('#postBtn');
    postbtn.onclick = addPost;

    const profileContainer = document.getElementById('profile');
    userData = getLoginData(); 

    if (userData.username) {
        profileContainer.querySelector('h2').innerText = userData.username;
    }

    const editBtn = document.getElementById("editBtn");
    editBtn.onclick = editUser;
}

function addPost(event) {
    event.preventDefault();
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

function editUser(userInfo){
    // Add your edit user logic here using the global variable `userData`
}
