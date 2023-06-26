/* Posts Page JavaScript */

"use strict";

const logoutButton = document.querySelector("#logout")
const postContainer = document.querySelector('#postContainer')
logoutButton.onclick = logout

function postFetch () {
    const loginData = getLoginData();
  console.log(JSON.parse(loginData.token))
    
    //const options = { 
        //method: "GET",
        //headers: { 
            
            //Authorization: `Bearer ${loginData.token}`,
       // },
   // };

    //fetch(apiBaseURL + "/auth/logout", options)
        //.then(response => response.json())
       // .then(data => console.log(data))
        //.finally(() => {
           

           // window.localStorage.removeItem("login-data");  
           // window.location.assign("/");  
       /// });
}

postFetch()


