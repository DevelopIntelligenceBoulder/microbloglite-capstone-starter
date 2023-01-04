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

    addPost.onsubmit = (submit) =>{

    }

        // let input1 = document.getElementById("input1").value;
        let textArea1 = document.getElementById("textArea1").value;

        fetch('https://microbloglite.herokuapp.com/api/posts', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY3Mjg0NDExMSwiZXhwIjoxNjcyOTMwNTExfQ.8Rx3gqwG02QsGWIggYU8FFvaKDcfMLdWgYFGmlKbZuA',
                
               
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