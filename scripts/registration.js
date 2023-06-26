"use strict"

//Variables

const usernameInput = document.getElementById(" ");
const pass1Input = document.getElementById("");
const pass2Input = document.getElementById("");
const registerBtn = document.getElementById(" ");
const apiBaseURL = "https://microbloglite.herokuapp.com"


//Verify that password fields are the same value and check that all fields are filled
// return error msg that describes specific problem (no msg means reg worked)

window.onload = () => {
    registerBtn.onclick = onRegisterBtnClicked;

}
//Require username & name 
function requireInput() {
    if (usernameInput.value == "") {
        alert("Please enter a Username");
    } else if (pass1Input.value == "") {
        alert("Please create a password");
    } else if (pass1Input.value != pass2Input.value) {
        alert("Passwords must match");
    }
}


//POST username and password to API 
function createNewUser() {
    let bodyData = {
        username: usernameInput.value,
        password: pass2Input.value,
    }
    fetch(apiBaseURL + "/api/users", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type":
                "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Extract the authentication token from the response data
            const authToken = data.token;
        })

}
