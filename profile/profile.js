window.onload = showLoggedInUser()

function showLoggedInUser() {
  const getCurrentUser = document.getElementById('profileName')
  const loggedInUser = getLoginData().username.toUpperCase()
  getCurrentUser.innerText = `${loggedInUser}'S PROFILE` 
}

const accessToken = JSON.parse(window.localStorage.getItem("login-data")).token;

let userNameValue;


function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    
    const baseURL = "https://microbloglite.herokuapp.com";
    const loginData = getLoginData();
    const fullName = document.getElementById("fullName");
    const userName = document.getElementById("userName");
    const editButton = document.getElementById("editButton");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    const profileTitle = document.getElementById("profileTitle"); 


    editButton.addEventListener("click", toggleEdit);
    saveButton.addEventListener("click", saveProfile);
    cancelButton.addEventListener("click", cancelEdit);
  
    let isEditing = false;
    let originalFullName = "";
    let originalUserName = "";

  
    fetchUserProfile();
    
    function toggleEdit() {
      isEditing = !isEditing;
  
      fullName.disabled = !isEditing;
      userName.disabled = !isEditing;
      saveButton.disabled = !isEditing;
      cancelButton.disabled = !isEditing;
  
      if (isEditing) {
        originalFullName = fullName.value;
        originalUserName = userName.value;

      } else {
        fullName.value = originalFullName;
        userName.value = originalUserName;

      }
    }
  

    function saveProfile() {
      const updatedData = {
        fullName: fullName.value,
        username: userName.value,
      };
  
      fetch(baseURL + `/api/users/${loginData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user profile data.");
          }
          return response.json();
        })
        .then((data) => {
          toggleEdit();
        
          console.log(loginData)
        
          if (updatedData.fullName !== loginData.fullName) {
            alert("Successfully Changed Full Name");
            loginData.fullName = updatedData.fullName;
            window.location.reload();
          }

          if (updatedData.username !== loginData.username) {
            loginData.username = updatedData.username;
            window.localStorage.removeItem("login-data");
            setTimeout(() => {
              alert("Successfully Changed Username! Press OK to Re-Login.");
              window.location.href = "/index.html";
            }, 0);
          } else {
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
          }
        })
        .catch((error) => {
          console.error("Failed to update user profile data:", error);
        });
    }
  
    function cancelEdit() {
      toggleEdit();
    }

  function fetchUserProfile() {
    fetch(baseURL + `/api/users/${loginData.username}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile data.");
        }
        return response.json();
      })
      .then((data) => {
        fullName.value = data.fullName;
        userName.value = data.username;
        profileTitle.textContent = data.fullName;
        displayAccountDate(data.createdAt);
      })
      .catch((error) => {
        console.error("Failed to fetch user profile data:", error);
      });
  }

  function displayAccountDate(dateString) {
    const accountDateElement = document.getElementById("creationDate");

    if (dateString) {
      const accountDate = new Date(dateString);
      if (!isNaN(accountDate)) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = accountDate.toLocaleDateString(undefined, options);
        accountDateElement.textContent = formattedDate;
        return;
      }
    }
     accountDateElement.textContent = "Date not available";
  }
  });

  
  const userEmail = document.getElementById('userEmail')
  const infoBtn = document.getElementById('infoBtn')
  const userMessage = document.getElementById('userMessage')
  const emailBtn = document.getElementById("emailBtn")

    infoBtn.addEventListener('mouseenter', function(){
      userMessage.classList.remove('hide')

    })

    infoBtn.addEventListener('mouseleave', function(){
      userMessage.classList.add('hide')
    })

    const editProfile = document.getElementById('editProfile')
    let emailInput = document.getElementById('emailInput')
    let emailHashHolder = document.getElementById('emailHashHolder')
    let hashAvail = document.getElementById('hashAvail')
    let hashUnavail = document.getElementById('hashUnavail')

    editProfile.addEventListener('click', editClicked)
    
    function editClicked(){
        userEmail.classList.toggle('slideDown')
        userEmail.classList.toggle('hide')
        emailHashHolder.classList.add('hide')
    }
    hashAvail.onclick = emailSubmitClicked
    hashUnavail.onclick = editClicked



    emailBtn.addEventListener('click', emailSubmitClicked)

    function emailSubmitClicked(){
        let getUrl = `https://en.gravatar.com/site/check/${emailInput.value}`
        let size = 'width=650, height=600'
        window.open(getUrl, '_blank', size)
        emailBtn.setAttribute('href', getUrl)
        userEmail.classList.add('hide')
        emailHashHolder.classList.remove('hide')

    }


  // profile pic
  let hashSubmit = document.getElementById('hashSubmit');
  let emailHashCode;
  let userPic = document.getElementById('userImg');
  
  hashSubmit.addEventListener('click', function() {
    emailHashCode = document.getElementById('emailHash').value;
    emailHashCode = emailHashCode.trim()
    profilePicFetch(emailHashCode);
  });
  
  function profilePicFetch(emailHashCode) {
    const apiUrl = `https://www.gravatar.com/${emailHashCode}.json?callback=processProfileData`;
  
    window.processProfileData = function(data) {
      userPic.setAttribute('src', data.entry[0].photos[0].value);
      ppPost(emailHashCode);
    };
  
    const script = document.createElement('script');
    script.src = apiUrl;
    document.body.appendChild(script);
    emailHashHolder.classList.add('hide');
  }
  
  function ppPost(emailHashCode) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: emailHashCode })
    };
  
    fetch(apiBaseURL + "/api/posts", options) 
      .then(response => response.json())
      .then(data => {
        createPPpost(data, emailHashCode);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  function createPPpost(posts, emailHashCode) {
    const post = posts.find(post => post.text === emailHashCode);
    if (post) {
      console.log('Profile picture found:', post.profilePic);
    } else {
      console.log('Profile picture not found');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener("userNameFetched", (event) => {

    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
    }
    fetch(apiBaseURL + "/api/posts", options)
      .then(response => response.json())
      .then(data => {
        for (let i of data){
          if (i.username === event.detail){
            emailHashCode = i.text;
            
          }
        }
        if (emailHashCode) {
          profilePicFetch(emailHashCode);
        }
      })
      .catch(error => {
        console.log(error);
      });
  });

  });
