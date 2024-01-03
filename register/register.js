'use strict';

const registrationForm = document.querySelector('#register');

registrationForm.onsubmit = DOSOMETHING

function DOSOMETHING (event) {
    event.preventDefault()
    console.log("HEYAAA")

    const registerData = {
        username: registrationForm.elements.username.value,
        password: registrationForm.elements.password.value,
        fullName: registrationForm.elements.fullName.value
    };
    return Post(registerData)
}

function Post (registerData) {
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.assign("/");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

