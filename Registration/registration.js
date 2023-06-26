console.log("js working");

const registerForm = document.querySelector("#register");

registerForm.onsubmit = function (event) {
  event.preventDefault();
  if (
    registerForm.registrationConfirmPassword.value !==
    registerForm.registrationPassword.value
  )
    return;
  console.log("passwords are the same");
  const body = {
    username: registerForm.registrationUsername.value,
    fullName: registerForm.registrationFullname.value,
    password: registerForm.registrationPassword.value,
  };
};
