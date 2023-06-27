
// const apiBaseURL = "https://microbloglite.herokuapp.com";
// // Backup server:   https://microbloglite.onrender.com


function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}

function login (loginData) {
    // POST /auth/login
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("/profiles");  // redirect

            return loginData;
        });
}

console.log(auth)


// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
function logout () {
    const loginData = getLoginData();


    
    // GET /auth/logout
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}




fetch('/api/posts')
.then(response => response.json())
.then((posts) => {
  document.getElementById('descriptionId').value = posts.text
    })

document.querySelector('newPostButton').addEventListener('click', () => {
  const params = {
    message: document.getElementById('descriptionId').value,
  }

  fetch('/api/posts', {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: {
      "Content-type": "application/json; charset=utf-8"
    }
  })
  .then(response => response.json())
  .then(postUploaded => {
    alert('success!')
    console.log(postUploaded)
  })
})
