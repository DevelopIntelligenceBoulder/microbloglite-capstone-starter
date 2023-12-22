"use strict";

const regForm = document.querySelector("#reg");

regForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const regData = {
        username: regForm.username.value,
        fullName: regForm.fullName.value,
        password: regForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    regForm.regButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    // login(regData);
};

// {
//     "users": [
//       {
//         "username": "string",
//         "fullName": "string",
//         "about": "string",
//         "createdAt": "2023-12-22T15:47:07.268Z",
//         "updatedAt": "2023-12-22T15:47:07.268Z"
//       }
//     ],
//     "count": 0,
//     "statusCode": 399
//   }
function Register (regData) {
    // POST /auth/login
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/html",
        },
        body: JSON.stringify(regData),
    };

    return fetch(api + "/api/users", options)
        .then(response => response.json())
        .then(regData => {
            window.localStorage.setItem("reg-data", JSON.stringify(regData));
            window.location.assign("./index.html");  // redirect

            return regData;
        });
}