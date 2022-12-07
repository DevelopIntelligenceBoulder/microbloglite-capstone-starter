const $q = (s) => document.querySelector(s);
const textField = $q("#textField")
const postBtn = $q("#postBtn");
function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

function createPost(event) {
    event.preventDefault();
    const bodyData = {
        text: textField.value
    }
     const loginData = getLoginData();

    fetch("https://microbloglite.herokuapp.com/api/posts", {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify(bodyData)
    }).then(response => response.json())
    .then(data => { 
            console.log(data)
    })
        .catch((err) => {
        console.log(err)
    })
}

window.onload = () => {
    postBtn.onclick = createPost; 
};
