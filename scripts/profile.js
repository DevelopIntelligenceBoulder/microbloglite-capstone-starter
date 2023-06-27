"use strict"

const logOutBtn = document.getElementById("logOutBtn");
const postBtn = document.getElementById("postBtn");
const bioField = document.getElementById("bioInput");
const postField = document.getElementById("postInput")

const loginData = getLoginData();
const token = loginData.token;

window.onload = () => {
    console.log("profile.js initiated")
    postBtn.onclick = onPostBtnClicked;
    logOutBtn.onclick = onLogoutBtnClicked;
}

function onLogoutBtnClicked(){
    logout();
}

function onPostBtnClicked() {
    let bodyData = {
        "text": postField.value
    }
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        }
            .then(response => response.JSON())
            .then(post => {
                //Success msg
                console.log(post)
                alert("Post successful!")
            })
    })
}
