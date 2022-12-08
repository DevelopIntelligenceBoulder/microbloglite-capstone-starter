/* Posts Page JavaScript */

"use strict";

const api = "https://microbloglite.herokuapp.com";

function getLoginData () {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
    }

// let element = document.getElementsByClassName("card-text");

    fetch( api + "/api/posts")
    .then(response => response.json())
    .then(data => {
        let postData = data.username + data.text + data.postId;
        // element.innerHTML = postData
        console.log(postData);
    });




// log out
    function logout() {
        const loginData = getLoginData();
     
        // GET /auth/logout
        const options = {
          method: "GET",
          headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
          },
        };
     
        fetch(api + "/auth/logout", options)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an
            // error with the fetch request above.
     
            window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
            window.location.assign("../index.html"); // redirect to landing page
          });
      }
     
     window.onload = () => {
         loadName();
         logoutButton.onclick = logout;
     }