const registerForm = document.querySelector("#register");
const messagePEl = document.getElementById("messageP");
const returnToLoginBtn = document.getElementById("returnToLogin");

returnToLoginBtn.addEventListener(
  "click",
  () => (window.location.href = "../index.html")
);
registerForm.onsubmit = function (event) {
  event.preventDefault();
  if (
    registerForm.registrationConfirmPassword.value !==
      registerForm.registrationPassword.value ||
    !registerForm.registrationUsername.value ||
    !registerForm.registrationPassword.value
  )
    return;
  const registrationBody = {
    username: registerForm.registrationUsername.value,
    fullName: registerForm.registrationFullname.value,
    password: registerForm.registrationPassword.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationBody),
  };
  fetch(apiBaseURL + "/api/users", options)
    .then((response) => response.json())
    .then((acctCreation) => {
      if (!acctCreation.statusCode) {
        messagePEl.textContent = "Success returning to login";
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1500);
      } else {
        console.log(acctCreation.message, acctCreation.statusCode);
      }
    })
    .catch((err) => {
      console.log(err, err.status);
    });
};
