
"use strict";

window.onload = () => {
    const logoutBtn = document.getElementById('logout');
    const userID = document.getElementsByClassName('userID');
    const textField = document.getElementsByClassName('textField');
    const date = document.getElementsByClassName('date');
    logoutBtn.addEventListener('click', logout);

    const username = getLoginData().username;

    for (let u of userID) {
        u.innerText = `Username: ${username}`;
    }
    getPosts(textField, date);
}
function getPosts(textField, date) {
    const loginData = getLoginData();
    fetch('https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=UserTest1',
        {
            headers: {
                Authorization: `Bearer ${loginData.token}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            for (let u of textField) {
                for(let d of data)
                u.innerText = d.text;
            }

            for (let dID of date) {
                for(let d of data)
                dID.innerText = (d.createdAt).substring(0, 10);
            }
        })
}