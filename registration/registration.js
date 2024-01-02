"use strict";

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const bioTextInput = document.getElementById('bioText');
const newUserBtn = document.getElementById('newUser');

window.onload = init;

function init (){
    newUserBtn.onclick = newUserBtnClicked ;
    
  }

  function newUserBtnClicked (){
    
      fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: userNameInput.value,
          fullName: "firstNameInput.value" + "" + "lastNameInput.value",
          password: passwordInput.value,
          }),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      })
      .then(response => response.json())
      
      .then(json =>{
        console.log(json);
        window.location.replace('/landing/landing.html');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle the error appropriately
      });
    }