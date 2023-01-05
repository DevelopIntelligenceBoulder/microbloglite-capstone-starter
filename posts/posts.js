/* Posts Page JavaScript */

"use strict";
window.onload = function () {
  getAllpost();
  onClickedlikesBtn;

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

function onClickedlikesBtn() {
  const likedbtn = document.getElementById("likedbtn");
  likedbtn.addEventListener("click", () => {
    let likeOutput = document.getElementById("likeOutput");

    likeOutput.value = parseInt(likeOutput.value) + 1;
    likeOutput.style.color = "green";
  });
  const dislikedbtn = document.getElementById("dislikedbtn");

  dislikedbtn.addEventListener("click", () => {
    let dislikeOutput = document.getElementById("dislikeOutput");

    dislikeOutput.value = parseInt(dislikeOutput.value) + 1;
    dislikeOutput.style.color = "green";
  });

  // const options={
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers:{
  //         "Content-Type": 'application/json'
  //     }

  // }
  // fetch(api+"/api/likes",options)
  // .then(res=>res.json())
  // .then(likes=>{

  // })
}
