window.onload = showLoggedInUser()

function showLoggedInUser() {
  const getCurrentUser = document.getElementById('profileName')
  const loggedInUser = getLoginData().username
  getCurrentUser.innerText = `${loggedInUser}'s Profile` 
}

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
  
    editButton.addEventListener("click", enableEdit);
  
    saveButton.addEventListener("click", saveProfile);
  
    fetchUserProfile();
  
    function enableEdit() {
      fullName.disabled = false;
      userName.disabled = false;
      saveButton.disabled = false;
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
        .then(() => {
          fullName.disabled = true;
          userName.disabled = true;
          saveButton.disabled = true;
        })
        .catch((error) => {
          console.error("Failed to update user profile data:", error);
        });
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
        })
        .catch((error) => {
          console.error("Failed to fetch user profile data:", error);
        });
    }
  });
  