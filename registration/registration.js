import { addRandomY } from "../auth.js";

function togglePasswordVisibility() {
  let passwordInput = document.getElementById("password");
  let showPasswordCheckbox = document.getElementById("showpasswordcheckbox");

  passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
}

window.onload = () => {
  addRandomY();

  let registerButton = document.getElementById("registerButton");
  registerButton.addEventListener("click", registerUser);

  let showPasswordCheckbox = document.getElementById("showpasswordcheckbox");
  showPasswordCheckbox.addEventListener("change", togglePasswordVisibility);
};

function registerUser() {
  let username = document.getElementById("username").value;
  let fullName = document.getElementById("fullname").value;
  let password = document.getElementById("password").value;

  let newUser = {
    username: username,
    fullName: fullName,
    password: password,
  };

  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then(() => {
      location.href = "/index.html";
    });
}
