const registrationForm = document.getElementById("registrationForm");
const fullName = document.getElementById("fullname");
const userName = document.getElementById("username");
const password = document.getElementById("password");
function registerNewUser(event) {
  event.preventDefault();

  const bodyData = {
    username: userName.value,
    fullName: fullName.value,
    password: password.value,
  };

  fetch("https://microbloglite.herokuapp.com/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      window.location.href = "/logInPage/index.html";
      sessionStorage.message = `Welcome ${userName.value}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

window.onload = () => {
  registrationForm.onsubmit = registerNewUser;
};
