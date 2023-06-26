/* Posts Page JavaScript */

"use strict";


const postContainer = document.querySelector('#postContainer')

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