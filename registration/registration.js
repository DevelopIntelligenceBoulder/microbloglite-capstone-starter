function togglePasswordVisibility() {
  let passwordInput = document.getElementById("password");
  let showPasswordCheckbox = document.getElementById("showpasswordcheckbox");

  passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
}

window.onload = () => {
  let registerButton = document.getElementById("registerButton");

  registerButton.onclick = () => {
    registerUser();
  };
};
