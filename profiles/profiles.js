const form = document.querySelector("form");
const postArea = document.getElementById("newContent");


const url = `https://microbloglite.herokuapp.com/api/posts`;

logoutBtn.addEventListener("click", () => {
  logout();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bodyData = {
    text: postArea.value,
  };

  async function makeNewPost() {
    const authData = getLoginData();
    const options = {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  if (isLoggedIn()) {
    makeNewPost();
  }
});

logoutBtn.addEventListener('click', () => {
  logout()
})

//--------------Retrieving users existing login Info----------------------


let currentUsername = document.getElementById('currentUsername')

const authData = getLoginData();
currentUsername.innerHTML = authData.username;

//^^^--https://blog.logrocket.com/localstorage-javascript-complete-guide/



////-----------update user info -------------------

const passWord = document.getElementById("password");
const fullName = document.getElementById("fullName");
const bioText = document.getElementById("bioText");

const updateForm = document.getElementById('updateUser')

updateForm.addEventListener('submit', (e) => {

  e.preventDefault()
  const updatedBody = {
    password: passWord.value,
    bio: bioText.value,
    fullName: fullName.value
  }
  
  fetch(apiBaseURL + `/api/users/${authData.username}`, {
    method: "PUT",
    body: JSON.stringify(updatedBody),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${authData.token}`
    }
  })
    .then((response) => response.json())
    .then(updatedBody => 
      { console.log(updatedBody)
      if (confirm('Successful Update')) {
        let confirmationMessage =
          document.getElementById('confirmationMessage');
        confirmationMessage.innerHTML =  "**User information updated**"
      }
    })
})

// https://stackoverflow.com/questions/51444615/javascript-change-password-by-using-an-input
