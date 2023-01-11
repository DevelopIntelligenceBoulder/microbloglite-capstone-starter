/* Posts Page JavaScript */

"use strict";

function CreatePost() {
  var myHeaders = new Headers();

  let loginData = getLoginData();
  //  console.log(loginData.token);
  //  alert(loginData);
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  var raw = JSON.stringify({
    text: document.getElementById("capturePost").value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// function Test() {
//      let test = getLoginData();
//      console.log(test);
// }
// Test();
