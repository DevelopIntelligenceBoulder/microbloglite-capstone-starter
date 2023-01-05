/* Posts Page JavaScript */

"use strict";
window.onload = function () {
  getAllpost();

  let Logoutbtn = document.getElementById("Logoutbtn");
  Logoutbtn.onclick = function () {
    logout();
  };
};
function getAllpost() {
  let headingContent = document.getElementById("headingContent");
  let contentArea = document.getElementById("contentArea");
  let author = document.getElementById("author");
  let timeStamp = document.getElementById("timeStamp");
  fetch("https://microbloglite.herokuapp.com/api/post")
    .then((res) => res.json())
    .then((data) => {
      headingContent.innerHTML = data._id;
      contentArea.innerHTML = data.text;
      author.innerHTML = data.username;
      timeStamp.innerHTML = data.createdAt;
    });
}
