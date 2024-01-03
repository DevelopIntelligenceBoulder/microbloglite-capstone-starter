'use strict';

const registrationForm = document.querySelector('#register');

registrationForm.onsubmit = function (event) {

    event.preventDefault();

    const registerData = {
        username: registrationForm.username.value,
        password: registrationForm.password.value,
        fullName: registrationForm.fullName.value
    };

    register(registerData);


fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'},
    body: JSON.stringify(registerData) 
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});
};