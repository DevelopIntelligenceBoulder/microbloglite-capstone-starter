/* Posts Page JavaScript */

"use strict";
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
        window.location.assign("/logInPage/"); // redirect to landing page
      });
  }