// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

// You can use this function to get the login data of the logged-in user (if any). It returns either an object including the username and token, or an empty object if the visitor is not logged in.
function getRegisterData () {
    const registerJSON = window.localStorage.getItem("register-data");
    return JSON.parse(registerJSON) || {};
}

// You can use this function to see whether the current visitor is logged in. It returns either `true` or `false`.
function isRegistered () {
    const registerData = getRegisterData();
    return Boolean(registerData.token);
}

let registerData = {
  username: document.getElementById("username").value,
  fullName: document.getElementById("fullName").value,
  password: document.getElementById("password").value
}

function registerUser() {
   const options = { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(registerData),
      };
      
      let registrationComplete = document.getElementById("registration-confirmation")
      
      fetch(apiBaseURL + "/api/users", options, {
        method: "POST",
        body: JSON.stringify.apply(registerData),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
      .then(json => {
        registrationComplete.innerHTML = "You have successfully created an account."
        
      });
    }
    registerUser();