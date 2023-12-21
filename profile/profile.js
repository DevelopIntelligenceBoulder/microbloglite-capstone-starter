// Check if user is not logged in, redirect to login page
if (!isLoggedIn()) {
    window.location.replace("/index.html");
}
// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function logoutAndRedirect(){
    logout();
    //Redirect the user to login page after logging out
    window.location.replace("/login.html");
}
// Function to create post via fetch ()
function createPost (){
    // POST /api.users

    const loginData = getLoginData();
    const blogTitle = blogTitleField.value;
    const article = articleField.value;

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-type": "application/json", 
        },
        body:JSON.stringify({
            title: blogTitle,
            content: article,
        }),
    };
    // note the api variable is defined in auth.js
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", options)
    .then(response => response.json())
    .then(users => {
        // Do something with created post...
        console.log(users);

        alert('Post created successfully!');

        window.location.href="/posts/index.html";
    }) .catch(error => {
        console.error("Error creating post:", error);

        alert('Error creating post. Please try again.');
    });
}

//Select elements from HTML
const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const publishBtn = document.querySelector('.publish-btn');

document.getElementById('post-form').addEventListener('submit',function(event){
    event.preventDefault();
    createPost();
});

document.getElementById('logoutBtn').addEventListener('click',function(){
    logoutAndRedirect();
});
