
"use strict"

window.onload = function() {
    
    const postbtn = document.querySelector('#postBtn');
    postbtn.onclick = addPost;
}

function addPost() {
    const textareaContent = document.querySelector('#textarea');

    const bodyData = {
        textContent: textareaContent.value,

    };

    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST', 
        body: JSON.stringify(bodyData),
        headers: {'Content-Type': 'application/json',
    "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im91c21hbmUiLCJpYXQiOjE3MDMyNzE5NDEsImV4cCI6MTcwMzM1ODM0MX0.JU97o44HmFyYUkw1u1NzzPzMPdmwDfs5Fute5OAmIeY"
            
            }
    })
    .then(response => response.json())
    .then(createPost => console.log(createPost));


}
 main
