"use strict";

// Function to handle user registration
async function register(username, password) {
  try {
    const response = await fetch(`${apiBaseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleAPIError(response);
    return data;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
}

// This function is called when the user submits the registration form.
async function handleRegistrationForm(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (username === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all the fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const registerButton = document.getElementById("registerButton");
  registerButton.disabled = true;
  registerButton.textContent = "Registering...";

  try {
    await register(username, password);
    alert("Registration successful! You can now log in.");
    window.location.href = "../html/landing.html";
  } catch (error) {
    console.log(error);
    alert(error.message);
  } finally {
    registerButton.disabled = false;
    registerButton.textContent = "Register";
  }
}

// Add event listener to the registration form
const registrationForm = document.getElementById("registration");
registrationForm.addEventListener("submit", handleRegistrationForm);
