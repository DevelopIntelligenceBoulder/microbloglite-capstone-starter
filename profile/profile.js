

const postBtn = document.querySelector("#postBtn");
const usernameTitle = document.querySelector("h1");
const textareaInput = document.querySelector("#postTextarea");
const cardUsernameOutput = document.querySelector("#usernameOutput");
const cardPostTextDisplay =document.querySelector("#postDisplayOutput");
const usersPostsNav = document.getElementById("usersPostsNav");
const newPostNav = document.getElementById("newPostNav");
const postDisplayDiv = document.querySelector("#newPostDisplay");
const postFormDisplayDiv = document.querySelector("#postform");

function loadUsersName() {
    const loginData = getLoginData();
    const usersName = loginData.username;
    usernameTitle.innerHTML = usersName;

}

function getLoginData () {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

function createNewPost(event) {
    event.preventDefault();

    const postInput = {
        text: textareaInput.value
    }

    const loginData = getLoginData();

    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(postInput),
    };

    fetch(api + "/api/posts", options)
    .then(response => response.json())
    .then(postsData => {

        sessionStorage.addedMessage = "Post has been uploaded."
        window.location = "./profile.html"
    })

}

function showUsersPost() {
    postDisplayDiv.style.display = "block";
    postFormDisplayDiv.innerHTML = " "

    const loginData = getLoginData();
    const usersName = loginData.username;

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

    fetch(api + "/api/posts", options)
    .then(response => response.json())
    .then(UsersPosts => {
        UsersPosts.forEach(post => {
            if(post.username == usersName) {
                cardUsernameOutput.innerText = post.username;
                cardPostTextDisplay.innerText = post.text;
            }
        });
    })
}

function hideUsersPosts() {
    postDisplayDiv.innerHTML = " ";
    postFormDisplayDiv.style.display = "block";
}

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

    fetch(api + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/index.html");  // redirect to landing page
        });
}

window.onload = () => {
    loadUsersName();
    postBtn.onclick = createNewPost;
    usersPostsNav.onclick = showUsersPost;
    newPostNav.onclick = hideUsersPosts;

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.onclick = logout;
}