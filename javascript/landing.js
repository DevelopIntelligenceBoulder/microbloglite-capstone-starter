/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};
// Function to get all users via fetch()
function getAllUsers() {
    //GET /api/users
    const loginData= getLoginData();
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        }
    };
    // note: the api variable is defined in auth.js
    fetch(api+"/api/users", options)
        .then(response => response.json());
        .then(users =>{
            //do something with the users aray...
            console.log(users);
        });
}
//window.location.replace(newURL) window.location.assign(newURL)