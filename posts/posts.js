/* Posts Page JavaScript */

"use strict";
window.onload = function () {
  getusersblogs();
};
function getusersblogs() {
  fetch("")
    .then((res) => res.json)
    .then((data) => {});
}
