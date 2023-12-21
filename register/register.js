// Get the register form element
const registerForm = document.getElementById('register');

// Get the confirm password input element
const confirmPasswordInput = document.getElementById('confirmPassword');

// Add an event listener to the register button
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the form inputs
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Get the confirm password input value
    const confirmPassword = confirmPasswordInput.value;

    // Check if the password and confirm password match
    if (passwordInput.value !== confirmPassword) {
        // Display error message for password mismatch
        const innerText = document.getElementById('innerText');
        innerText.textContent = 'Passwords do not match.';
        return; // Stop the registration process
    }

    // Checks if the username is at least 3 characters long
    if (usernameInput.value.length < 3) {
        // Display error message for username length
        const innerText = document.getElementById('innerText');
        innerText.textContent = 'Username must be at least 3 characters long.';
        return;
    }

    // Creates a new user object
    const newUser = {
        fullName: nameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
    };

    // Performs a fetch request to register the new user
    try {
        const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            // If registration is successful, redirect to login page
            window.location.href = '../index.html';
        } else {
            // If registration failed, display error message
            const error = await response.json();
            console.error(error);
            // Display the error message in the innerText element
            const innerText = document.getElementById('innerText');
            innerText.textContent = error.message;
        }
    } catch (error) {
        console.error(error);
        // Display the error message in the innerText element
        const innerText = document.getElementById('innerText');
        innerText.textContent = 'An error occurred during registration.';
    }
});
