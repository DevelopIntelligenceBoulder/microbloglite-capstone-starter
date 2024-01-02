
"use strict"

window.onload = function() {
    const postbtn = document.querySelector('#postBtn');
    postbtn.onclick = addPost;

    const userData = getLoginData();
    const profileContainer = document.getElementById('profile');

    if (userData.username) {
        profileContainer.querySelector('h2').innerText = userData.username;
    }
}

function addPost() {
    const textareaContent = document.querySelector('#textarea');

    const bodyData = {
        text: textareaContent.value,
    };

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST', 
        body: JSON.stringify(bodyData),
        headers: {'Content-Type': 'application/json',
    "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBvcHNtb2tlIiwiaWF0IjoxNzA0MjI0NzczLCJleHAiOjE3MDQzMTExNzN9.v478-orrt1_zfrZTX4hHK3a99zP9Un5CJQemW6xqddQ"
            
            }
    })
    .then(response => response.json())
    .then(createPost => console.log(createPost));


}

