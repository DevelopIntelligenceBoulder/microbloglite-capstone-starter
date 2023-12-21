/* Posts Page JavaScript */

"use strict";
window.onload = () => {
    function toggleDropdown() {
        let dropdown = document.getElementById("dropdownContent");
        dropdown.classList.toggle("show");
    }

    window.onclick = function(e) {
        if(!e.target.matches('.nav-user-icon')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            for(let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if(openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}