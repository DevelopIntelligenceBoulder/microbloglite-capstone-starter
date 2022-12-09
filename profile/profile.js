

const postBtn = document.querySelector("#postBtn");
const usernameTitle = document.querySelector("h1");
const textareaInput = document.querySelector("#postTextarea");
const cardUsernameOutput = document.querySelector("#usernameOutput");
const cardPostTextDisplay =document.querySelector("#postDisplayOutput");
const usersPostsNav = document.getElementById("usersPostsNav");
const newPostNav = document.getElementById("newPostNav");
const postDisplayDiv = document.querySelector("#newPostDisplay");
const postFormDisplayDiv = document.querySelector("#postform");
const profilePicDiv = document.querySelector("#profilePic");
const newNav = document.querySelector("#newNav");
const myNav = document.querySelector("#myNav")
const editButton = document.getElementById("editBtn");
const userBioDisplayDiv = document.querySelector("#userBio");
const editBioDisplayDiv = document.querySelector("#editUserBio");
const usersNameOutput = document.querySelector("#usersName");
const editFullnameDisplayDiv = document.querySelector("#editUserFullname");
const saveEditsBtn = document.getElementById("editSaveBtn");
const editDescriptionInput = document.querySelector("#editDescription");
const editFullnameInput = document.querySelector("#floatingFullnameInput");
const userBioDescriptionOutput = document.querySelector("#userBioDescription");



function loadUsersName() {
    usersNameOutput.style.display = "block";
    const loginData = getLoginData();
    const usersName = loginData.username;
    usersName.className = "usernameTitle";
    usernameTitle.innerText = usersName;
    newNav.className = "navActive";

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

    fetch(api + "/api/users", options)
    .then(response => response.json())
    .then(usersData => {
        for (const user of usersData) {
            if(user.username == loginData.username) {
                usersNameOutput.innerText = user.fullName;
            }
        }
    })

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
    myNav.className = "navActive";
    newNav.className = "navNonActive";

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

    fetch(api + "/api/posts", options).then(response => response.json())
    .then(UsersPosts => {
        UsersPosts.forEach(post => {
            if(post.username == usersName) {

                let cardSection = document.createElement("div");
                cardSection.className = "card";
                cardSection.className = "margin";
                postDisplayDiv.appendChild(cardSection);

                let cardTitle = document.createElement("h3");
                cardTitle.className = "card-title";
                cardTitle.className = "headColor"
                cardTitle.innerText = post.username;

                let cardDescription = document.createElement("p");
                cardDescription.className = "postSpacing"
                cardDescription.innerText = post.text;

                let cardLikes = document.createElement("h5");
                cardLikes.className = "card-subtitle";
                cardLikes.className = "likeColor"
                cardLikes.innerHTML = `&#9825; ${countedLikes()}`;

                
                const divContainer = document.createElement("div");
                divContainer.className = "card-body";
                divContainer.className = "padding"
                cardSection.appendChild(divContainer);
                divContainer.append(cardTitle, cardDescription, cardLikes);
                
                function countedLikes() {
                    let counter = 0;
                    for (const user of post.likes) {
                        if(user._id == post._id) counter += 1;
                    }
                    return counter;
                }
            }
        });
    })
}

function hideUsersPosts() {
    postDisplayDiv.innerHTML = " ";
    postFormDisplayDiv.style.display = "block";
    myNav.className = "navNonActive";
    newNav.className = "navActive";
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

function loadUsersProfilePicture() {
    const loginData = getLoginData();

    let imageSource = md5(loginData.username);

    const profileImg = document.createElement("img");
    profileImg.src = `https://www.gravatar.com/avatar/${imageSource}?d=${encodeURIComponent("https://cdn.pixabay.com/photo/2014/12/21/23/59/toy-576514_1280.png")}&s=150`;
    profileImg.alt = "User's profile Picture";
    profileImg.width = 140;

    profilePicDiv.appendChild(profileImg);

}

function loadEditInputs() {
    userBioDisplayDiv.style.display = "none";
    usersNameOutput.style.display = "none"
    editBioDisplayDiv.style.display = "block";
    editFullnameDisplayDiv.style.display = "block"

}

function saveEdits() {
    userBioDisplayDiv.style.display = "block";
    usersNameOutput.style.display = "block";
    editBioDisplayDiv.style.display = "none";
    editFullnameDisplayDiv.style.display = "none";

    const loginData = getLoginData();

    const editInputs = {
        password: loginData.password,
        bio: editDescriptionInput.value,
        fullName: editFullnameInput.value
      }

    const options = { 
        method: "PUT",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(editInputs),
    };

    fetch(api + `/api/users/${loginData.username}`, options)
    .then(response => response.json())
    .then(userData => {
        console.log(userData);
        userBioDescriptionOutput.innerText = userData.bio;
        usersNameOutput.innerText = userData.fullName;
        loadBio(userData.bio);
    })

}

function loadBio() {
    const loginData = getLoginData();

    const options = { 
        method: "GET",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(api + `/api/users/${loginData.username}`, options)
    .then(response => response.json())
    .then(usersData => {
        userBioDescriptionOutput.innerText = usersData.bio;
    })
}

window.onload = () => {
    loadUsersProfilePicture();
    loadUsersName();
    loadBio();
    postBtn.onclick = createNewPost;
    usersPostsNav.onclick = showUsersPost;
    newPostNav.onclick = hideUsersPosts;
    editButton.onclick = loadEditInputs;
    saveEditsBtn.onclick = saveEdits;
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.onclick = logout;
}