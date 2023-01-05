"use strict";


const postId = document.getElementById("postId");
const addPost = document.getElementById("addPost");
const input1 = document.getElementById("input1");
const textArea1 = document.getElementById("textArea1");
const logoutBtn = document.getElementById("logoutBtn");
// const userName = document.getElementById("userName");


window.onload = () =>{
    let loginData = getLoginData();


    
    // userName.innerText =(loginData()).username;

    isLoggedIn();

    document.getElementById("addPost").style.display = "none";

    postId.onclick = () =>{
    document.getElementById("addPost").style.display = "block";
    }

    addPost.onsubmit = (submit) =>{

    }

        // let input1 = document.getElementById("input1").value;
        let textArea1 = document.getElementById("textArea1").value;

        fetch('https://microbloglite.herokuapp.com/api/posts', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
          
             },
                  body: JSON.stringify({ text: textArea1})
            
          


        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
        })

        logoutBtn.onclick = () =>{
            logout();
        }
       

} 
