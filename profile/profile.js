"use strict";

window.onload = () => {
    const form = document.getElementById('form');
    const logoutBtn = document.getElementById('logout');
    //storeLoginInfoTest();
    const loginData = getLoginData();
    console.log(loginData.token)
const subBtn = document.getElementById('submitBtn');
    form.addEventListener('submit', e =>{
        e.preventDefault();
        createPost();
        getPosts();
    })
    
    logoutBtn.addEventListener('click', logout);
}

function createPost() {
    const loginData = getLoginData();
    let PostArea = document.getElementById('PostArea');
    console.log(loginData);
    const bodyData = {
        text : PostArea.value
    }
    console.log(JSON.stringify(bodyData))
    fetch('https://microbloglite.herokuapp.com/api/posts', {
        method: 'POST', 
        body: JSON.stringify(bodyData),
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(data => {
    })
    .catch(err => console.log(err))
}

function getPosts(){
    const loginData = getLoginData();
    fetch('https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=UserTest1', 
    {
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
function storeLoginInfoTest(){
    const logindata = {
        username: "UserTest1",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXJUZXN0MSIsImlhdCI6MTY3MjkzNjc1OCwiZXhwIjoxNjczMDIzMTU4fQ.wyG6AfCiB_ivKe6hWh_zUYNF1-V9U9H8o_VaCzywBn0"
    }

    localStorage.setItem("login-data", JSON.stringify(logindata));
}