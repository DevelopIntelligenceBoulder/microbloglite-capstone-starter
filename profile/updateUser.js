console.log("update");

const loginData = JSON.parse(window.localStorage.getItem("login-data"));
const usernameField = document.getElementById("username");
const nameField = document.getElementById("newName");
const bioField = document.getElementById("bio");
const updateProfileBtn = document.getElementById("updateProfile");
const newPwd = document.getElementById("newPwd");
const confirmPwd = document.getElementById("confirmPwd");
const errorMessage = document.getElementById("messageP");

displayUser();

function displayUser() {
  const options = {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
    .then((response) => response.json())
    .then((user) => {
      usernameField.value = user.username;
      nameField.value = user.fullName;
      bioField.value = user.bio;
    });
}
function checkform() {
  errorMessage.textContent = "";
  let form = false;
  if (nameField.value.length < 3) {
    errorMessage.textContent = "Name must be at least 3 characters";
  } else if (newPwd.value.length < 6) {
    errorMessage.textContent = "Password is too short";
  } else if (confirmPwd.value === newPwd.value) form = true;
  else errorMessage.textContent = "Passwords must match";
  return form;
}

updateProfileBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!checkform()) return;
  const profileBody = {
    password: newPwd.value,
    bio: bioField.value,
    fullName: nameField.value,
  };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },

    body: JSON.stringify(profileBody),
  };
  fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
    .then((response) => response.json())
    .then((user) => {
      displayUser();
      window.location.href = "./index.html";
    })
    .catch((err) => {
      console.log(err.status);
    });
});

const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", logout);
