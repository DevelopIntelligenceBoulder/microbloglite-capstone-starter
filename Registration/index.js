"use strict";
console.log("hi");

function signup() {
  const username = document.getElementById("username").value;
  const fullName = document.getElementById("name").value;
  const password = document.getElementById("password").value;

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
      // console.log(data);
      // if (Boolean(data.success)) {
      //   console.log(data.success);
      //   alert("Sign up successful!");
      window.location.href = "./test.html";
      // } else {
      //   alert("Sign up failed. Please try again.");
      // }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Please fill out all fields!");
    });
}
