"use strict";
const fullnameInput = document.getElementById("inputName");
const usernameInput = document.getElementById("inputUsername");
const passwordInput = document.getElementById("InputPassword");
const confirmPasswordInput = document.getElementById("InputReEnterPassword");
const registerBtn = document.getElementById("registerButton");

window.onload = () => {
    registerBtn.onclick = registerBtnClicked
}

function registerBtnClicked(){

    if(passwordInput.value == confirmPasswordInput.value && usernameInput.value != "" && fullnameInput.value != "" ){
        let bodyData = {
            username: usernameInput.value,
            fullName: fullnameInput.value,
            password: passwordInput.value,
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
    };
    
    return fetch("https://microbloglite.herokuapp.com/api/users", options)
        .then((response) => response.json())
        .then((loginData) => {
            window.location.assign("posts.html");
        });
    }
    else{
        console.log("error")
        errorMessage.innerHTML = "Password does not match"
    }
};