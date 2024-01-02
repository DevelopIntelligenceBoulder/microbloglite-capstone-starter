// Check if user is not logged in, redirect to login page
if (!isLoggedIn()) {
    window.location.replace("/index.html");
}
// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function logoutAndRedirect(){
    logout();
    //Redirect the user to login page after logging out
    window.location.replace("/index.html");
}
// Function to create post via fetch ()
function createPost (){

    // Retrieve values from input fields
    const blogTitle = blogTitleField.value;
    const article = articleField.value;

    // Check if both title and article have values
    if(!blogTitle || !article){
        alert('Please fill in both title and article fields.');
        return;
    }

    // Get login data for authorization
    const loginData = getLoginData();

    // POST request with headers and body
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-type": "application/json", 
        },
        body:JSON.stringify({
            text: blogTitle + " " + article,
        }),
    };
    // note the api variable is defined in auth.js. FETCH to send request to server
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json ();
        
    }) .then(createdPostData =>{
        console.log(createdPostData);

        alert('Post created successfully!');
        // Redirects 
        window.location.href="/posts/index.html";
    })
     .catch(error => {
        console.error("Error creating post:", error);

        alert('Error creating post. Please try again.');
    });
}

//Select elements from HTML
const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

// Event listner for form submission & character limits
document.getElementById('post-form').addEventListener('submit',function(event){
    event.preventDefault();
    if(isArticleLengthValid()){
        createPost();
    } else {
        alert('Title or article exceeds the maximum character limit.');
    }
});

// Function to check if article length is valid
function isArticleLengthValid(){
    const title = blogTitleField.value;
    const article = articleField.value;
    const maxArticleLength = 200; 
    const maxTitleLength = 50;

    return title.length <= maxTitleLength && article.length <= maxArticleLength;
}

// // Event listener for Publish button click 
// document.getElementById('publishBtn').addEventListener('click', function(){
//     createPost();
// });

// Event listener for logout button click
document.getElementById('logoutBtn').addEventListener('click',function(){
    logoutAndRedirect();
});
