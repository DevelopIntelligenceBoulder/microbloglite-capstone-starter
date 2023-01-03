/* Posts Page JavaScript */

"use strict";
window.onload = function () {
  getAllUsers();
};
function getAllUsers() {
  fetch("https://microbloglite.herokuapp.com/api/post", Options);
    .then(res => res.json())
    .then(data => {

    })
}
