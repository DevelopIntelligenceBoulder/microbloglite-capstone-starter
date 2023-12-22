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