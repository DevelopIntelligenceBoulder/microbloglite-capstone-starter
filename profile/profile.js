"use strict";


const postId = document.getElementById("postId");
const addPost = document.getElementById("addPost");
const input1 = document.getElementById("input1");
const textArea1 = document.getElementById("textArea1");
const logoutBtn = document.getElementById("logoutBtn");



window.onload = () =>{
    isLoggedIn();

    document.getElementById("addPost").style.display = "none";

    postId.onclick = () =>{
    document.getElementById("addPost").style.display = "block";
    }

  

        // let input1 = document.getElementById("input1").value;
 

        logoutBtn.onclick = () =>{
            logout();
        }
    



}


addPost.onsubmit = (submit) =>{

    let textArea1 = document.getElementById("textArea1").value;
    console.log(JSON.stringify({ text: textArea1}));
        fetch('https://microbloglite.herokuapp.com/api/posts', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'Authorization': `Bearer ${(getLoginData()).token}`
               
             },
                    body: JSON.stringify({ text: textArea1})
          


        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
        })


}