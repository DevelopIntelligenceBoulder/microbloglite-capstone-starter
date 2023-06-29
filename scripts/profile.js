"use strict"

const logOutBtn = document.getElementById("logOutBtn");
const postBtn = document.getElementById("postBtn");
//Static Version of Bio
const bioFieldStatic = document.getElementById("bioFieldStatic");

//Inputbox Version of Bio
const bioFieldEditable = document.getElementById("CardForTextInput")
const bioEditBtn = document.getElementById("EditProfileBtn");
const bioSaveBtn = document.getElementById("DoneWithProfileBtn")
const postField = document.getElementById("postField");

const loginData = getLoginData();
const token = loginData.token;

window.onload = () => {
    console.log("profile.js initiated")
    postBtn.onclick = onPostBtnClicked;
    logOutBtn.onclick = onLogoutBtnClicked;
    bioEditBtn.onclick = onbBioEditBtnClicked;
    bioSaveBtn.onclick = onBioSaveBtnClicked;
    hidebioFieldEditable();

    // document.getElementById("FullName") = loginData.fullname

    //fetch request to populate Name and username with api info
}

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
            .then(response => response.JSON())
            .then(post => {
                //Success msg
                console.log(post)
                alert("Post successful!")
                window.location.replace("../post.html")
            })
    })
}

function onbBioEditBtnClicked() {
    // set the current value of the input box to the editable version to make minor edits easier
    if (bioFieldStatic.value != "") {
        bioFieldEditable.value = bioFieldStatic.value
    }

    //Show the editable input box
    showbioFieldEditable();
}

function onBioSaveBtnClicked() {
    //Set the value of the Input text box to the value of the static text box
    bioFieldStatic.value = bioFieldEditable.value;

    hidebioFieldEditable();

    let bodyData = {
        bio: bioFieldEditable.value
    }
    let username = loginData.username
    let options = {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${loginData.token}`
        }
    };

    fetch(apiBaseURL + "/api/users/" + username , options)
    .then(response => response.json())
    .then(newBio => {
        console.log(newBio);  
        // clear editable biofield here?  
    })
    .catch(error => {
        alert("Error updationg bio. Please try again later")
    })
}



function hidebioFieldEditable() {
    bioFieldEditable.style.display = "none";
    bioFieldStatic.style.display = "block";
    bioEditBtn.style.display = "block"
    bioSaveBtn.style.display = "none"
}
function showbioFieldEditable() {
    bioFieldEditable.style.display = "block";
    bioFieldStatic.style.display = "none";
    bioEditBtn.style.display = "none"
    bioSaveBtn.style.display = 'block'
}
