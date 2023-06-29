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
    
          if (updatedData.fullName !== loginData.fullName) {
            alert("Successfully Changed Full Name!");
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
        })
        .catch((error) => {
          console.error("Failed to fetch user profile data:", error);
        });
    }
  });
  