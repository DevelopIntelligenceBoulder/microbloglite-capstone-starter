"use strict"



const logOutBtn = document.getElementById("logOutBtn");
const postBtn = document.getElementById("postBtn");
const fullNameDisplay = document.getElementById("FullName");
const usernameDisplay = document.getElementById("username");
//Static Version of Bio
const bioFieldStatic = document.getElementById("bioFieldStatic");

//Inputbox Version of Bio
const textInputCard = document.getElementById("CardForTextInput");
const bioFieldEditable = document.getElementById("EditBioTextField");

//buttons for the bio boxes
const bioEditBtn = document.getElementById("EditProfileBtn");
const bioSaveBtn = document.getElementById("DoneWithProfileBtn");
const postField = document.getElementById("postField");

//login data elements
const loginData = getLoginData();
const token = loginData.token;
const username = loginData.username;


window.onload = () => {
    console.log("profile.js initiated")
    postBtn.onclick = onPostBtnClicked;
    logOutBtn.onclick = onLogoutBtnClicked;
    bioEditBtn.onclick = onbBioEditBtnClicked;
    bioSaveBtn.onclick = onBioSaveBtnClicked;
    hidebioFieldEditable();
    populateUsernameAndFullName();

    usernameDisplay.innerHTML = username;
}



//populate Username, full name, and bio from username endpoint
function populateUsernameAndFullName() {
    fetch(apiBaseURL + "/api/users/" + username, {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            fullNameDisplay.innerHTML = data.fullName;
            bioFieldStatic.innerHTML = data.bio;
            usernameDisplay.innerHTML = data.username;
        });
}


// What is the shape of login data?
console.log(loginData)

function onLogoutBtnClicked() {
    logout();
}


//POST request to create new posts(redirects to the posts page after creating a post)
function onPostBtnClicked() {
    let bodyData = {
        text: postField.value
    }
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then(response => response.json())
        .then(post => {
            // Success msg
            console.log(post);
         window.location.replace("../post-bootstrapdemo.html");
        });
}

function onbBioEditBtnClicked() {
    // set the current value of the input box to the editable version to make minor edits easier
    if (bioFieldStatic.textContent != "") {
        bioFieldEditable.textContent = bioFieldStatic.textContent
    }

    //Show the editable input box
    showbioFieldEditable();
}

function onBioSaveBtnClicked() {
   

    // hide the editable bio box
    hidebioFieldEditable();

 //Set the value of the Input text box to the value of the static text box
    bioFieldStatic.textContent = bioFieldEditable.value;
    

    let bodyData = {
        bio: bioFieldEditable.value,
    }
    
    fetch(apiBaseURL + "/api/users/" + username, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then(response => response.json())
        .then(newBio => {
            console.log(newBio);
            bioFieldEditable.value = ''; // Clear the editable biofield
        })
        .catch(error => {
            alert("Error updating bio. Please try again later");
        });

}




function hidebioFieldEditable() {
    bioFieldEditable.style.display = "none";
    bioFieldStatic.style.display = "block";
    bioEditBtn.style.display = "block";
    bioSaveBtn.style.display = "none";
    textInputCard.style.innerHTML = "none"
}
function showbioFieldEditable() {
    bioFieldEditable.style.display = "block";
    bioFieldStatic.style.display = "none";
    bioEditBtn.style.display = "none"
    bioSaveBtn.style.display = 'block'
}