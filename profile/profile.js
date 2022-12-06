"use strict";

const postBtn = document.querySelector("#postBtn");
const textareaInput = document.querySelector("#postTextarea");

function createNewPost() {
    const postInput = {
        text: textareaInput.value
    }

    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postInput),
    };

    fetch(api + "/api/posts", options)
    .then(response => response.json())
    .then(postData => {
        
    })

}

window.onload = () => {
postBtn.onclick = createNewPost;
}