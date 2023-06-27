function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://microbloglite.herokuapp.com";
    const loginData = getLoginData();
    const fullName = document.getElementById("fullName");
    const userName = document.getElementById("userName");
    
    fetch(baseURL + `/api/users/${loginData.username}`, {
      method: "GET",
      headers: {
        "accept": "application/json",
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
  });
  