"use strict"

const registerForm = document.getElementById("register");

registerForm.onsubmit = function(e) {
    e.preventDefault(); 

    const getData = {
        username: registerForm.username.value,
        fullName: registerForm.fullname.value,
        password: registerForm.password.value,
    }
    console.log(getData)
    const formData =  {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(getData),
    };
    registerUser(formData); 
}

function registerUser(formData){
    fetch("https://microbloglite.herokuapp.com/api/users", formData)
        .then(response => response.json())
        .then(user => {
            window.location.assign("/index.html")
        });
        
}

/* if the log in is successful, then switch to the login page */
/* if unsuccessful, display message that reads "Try Again" */