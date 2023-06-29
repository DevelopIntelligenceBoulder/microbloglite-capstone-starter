"use strict"

const registrationForm = document.querySelector("#registrationForm")


function formSubmit(event) {
    event.preventDefault()
    const userInfoCont = {
        username:registrationForm.userNameInput.value,
        fullName:registrationForm.fullNameInput.value,
        password:registrationForm.passwordInput.value,
    }
    userInfoFetch(userInfoCont)
}

function userInfoFetch (userInfo) {
        const options = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    };

    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json())
        .then(loginData => {
            console.log(loginData)
            window.location.assign("../index.html")  
        })
    }

registrationForm.onsubmit = formSubmit