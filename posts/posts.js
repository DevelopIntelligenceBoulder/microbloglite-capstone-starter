/* Posts Page JavaScript */

"use strict";

const $q = (s) => document.querySelector(s); 

function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


const userName = $q("#userName")
function displayAlert() {
  if (sessionStorage.message) {
    console.log(sessionStorage.message);
    successAlert.innerText = sessionStorage.message;
    successAlert.style = "display-block";
  }
}


 function loadName() {
     const loginData = getLoginData();
     userName.innerText = loginData.username; 
 }

window.onload = () => {
     loadName()
}