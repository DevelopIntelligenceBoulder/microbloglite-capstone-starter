"use strict";
console.log("hi");

function signup() {
  const username = document.getElementById("username").value;
  const fullName = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  if (username === "" || fullName === "" || password === "") {
    alert("Please fill out all fields!");
    return;
  }

  const userData = {
    username: username,
    fullName: fullName,
    password: password,
  };
  console.log(userData);
  fetch("https://microbloglite.herokuapp.com/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong, please try again!");
    });
  // Found this method on stackoverflow
}
