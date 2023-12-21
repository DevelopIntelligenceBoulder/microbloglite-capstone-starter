/* Posts Page JavaScript */

"use strict";

  function toggleDropdown() {
    let dropdown = document.getElementById("dropdownContent");
    dropdown.classList.toggle("show");
  }

  window.onclick = function (e) {
    if (!e.target.matches(".nav-user-icon")) {
      let dropdown = document.getElementsByClassName("dropdown-content");

      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  };

  window.onload = () => {
    
  }

