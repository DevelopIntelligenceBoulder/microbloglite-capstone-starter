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
  function registerUser(){
    let username = document.getElementById("username").value;
    let fullName = document.getElementById("fullname").value;
    let password = document.getElementById("password").value;
    
  }
};
