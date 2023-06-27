"use strict"

//Variables

const usernameInput = document.getElementById("UsernameInput");
const fullNameInput = document.getElementById("fullNameInput")
const pass1Input = document.getElementById("pass1Input");
const pass2Input = document.getElementById("pass2Input");
const registerBtn = document.getElementById("registerBtn");
const form = document.getElementById("registerForm")
// const apiBaseURL = "https://microbloglite.herokuapp.com";



//Verify that password fields are the same value and check that all fields are filled
// return error msg that describes specific problem (no msg means reg worked)

window.onload = () => {
    form.onsubmit = onRegisterBtnClicked;

    


}
//Require username & name 
function requireInput() {
    if (usernameInput.value == "") {
        alert("Please enter a Username");
    } else if (pass1Input.value == "") {
        alert("Please create a password");
    } else if (fullNameInput.value == "") {
        alert("Please enter your first and last name");
    } else if (pass1Input.value != pass2Input.value) {
        alert("Passwords must match");
    }
    return true;
}





//POST username and password to API 
function createNewUser() {
    let bodyData = {
        username: usernameInput.value,
        fullName: fullNameInput.value,
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
        .then(response => {
            console.log("Its Working!")
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("An unexpected error has occurred. Please try again later.");
            }
        })
        .then(data => {
            alert("New user created");
            const authToken = data.token;
            console.log(bodyData.username);
            window.location.href = "../index.html";
        })
        .catch(error => {
            alert(error.message);
        });
}

function onRegisterBtnClicked(event) {
    event.preventDefault(); // Prevent form submission
     console.log(requireInput())
    if (requireInput()) { 
      createNewUser();
    }
  }
