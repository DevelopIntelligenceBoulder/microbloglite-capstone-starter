"use strict";

window.onload = () => {
    document.getElementById("createAccount").addEventListener("submit", function (e) {
        e.preventDefault();

        // Retrieve user input
        let fullName = document.getElementById("fullName").value;
        let username = document.getElementById("signupUsername").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        // Reset error messages
        document.getElementById("fullNameError").textContent = "";
        document.getElementById("usernameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("passwordError").textContent = "";
        document.getElementById("confirmPasswordError").textContent = "";

        // Validate input
        if (!fullName) {
            document.getElementById("fullNameError").textContent = "Full Name is required";
            return;
        }

        if (!username) {
            document.getElementById("usernameError").textContent = "Username is required";
            return;
        }

        if (!email) {
            document.getElementById("emailError").textContent = "Email is required";
            return;
        }

        if (!password) {
            document.getElementById("passwordError").textContent = "Password is required";
            return;
        }

        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").textContent = "Passwords do not match";
            return;
        }

        // Perform fetch request to register user
        fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                username: username,
                email: email,
                password: password,
            }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Registration failed");
            }
            return res.json();
        })
        .then(data => {
            data, alert("Registration successful!"); // Redirect to login page
        })
        .catch(error => {
            document.getElementById("form__message--error").textContent = error, "Registration failed. Please try again.";
        });
    });
};
