'use strict'

const registrationForm = document.querySelector(Register);
registrationForm.onsubmit = function (event) {
    console.log("hello world")
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

const RegisterData = {
    username: registrationForm.username.value,
    password: registrationForm.password.value,
    fullName: registrationForm.fullName.value
}


    // Time to actually process the login using the function from auth.js!
    Register(RegisterData);
}
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    
    })
    .catch((error) => {
        console.error('Error:', error);
    }
    )