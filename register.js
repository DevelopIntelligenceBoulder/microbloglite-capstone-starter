'use strict';

const signUpBtn = document.getElementById('signUpBtn');
const fullName = document.getElementById('fullName');
const userName = document.getElementById('userName');
const password = document.getElementById('password');

signUpBtn.addEventListener('click', () => {
    console.log('clicked')
    const formData = {
        username: userName.value,
        fullName: fullName.value,
        password: password.value
    }
    fetch('https://microbloglite.herokuapp.com/api/users',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            'Content-type': 'application/json; charset=utf-8'}
    }).then((response) => response.json()).then(data => {
        console.log(data);
    });

});