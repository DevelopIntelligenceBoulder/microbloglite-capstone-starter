"use strict";


function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('https://microbloglite.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.token = data.token
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }

        