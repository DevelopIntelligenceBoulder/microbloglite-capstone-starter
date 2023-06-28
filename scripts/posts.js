/* Posts Page JavaScript */

"use strict";

const logoutBtn = getElementById("logoutBtn"); 
const userCard = getElementById("userCard"); 
if (isLoggedIn() === false) window.location.replace("/");

window.onload = function (){
console.log("Page is loading...."); 

}


fetch ('https://microbloglite.herokuapp.com/api/posts')
.then (response => response.json())
.then(userpsots(users) { 
    users.forEach(user
        =>{
            const div = 
            document.createElement('div'); 
            const image = 
            document.createElement('img'); 
            const fullName=
            document.createElement ('h3'); 
            const about
            document.createElement('h3'); 
            const like = 
            document.createElement('button');
            div.classList = 'card'
            image.classList = 'card-img'
            like.classList = 'empty'
        })
})
