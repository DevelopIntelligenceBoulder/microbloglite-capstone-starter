/* Posts Page JavaScript */
let logoutBtn =
    document.getElementById("Logout-button");
logoutBtn.onclick = logout;
"use strict";


const loginData = getLocalUserData();
const options = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${loginData.token}`,
    },
};

return await fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
        console.log(posts); //log grab all post 

    });
