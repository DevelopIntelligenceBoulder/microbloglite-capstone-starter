// Profile Page Javascript

"use strict"



window.onload = () => {

    // Looks for the logout button in by its id in html 
    const logOutButton = document.querySelector("#logOutButton");
    // With the add event listener when the button is clicked it will call the funciton
    // and logout the user snf clear the local data of and send them to the login page
    logOutButton.addEventListener("click", logout)

    const addTodoForm = document.querySelector("#createPost");

    addTodoForm.addEventListener("submit", addPosts)


}


// Create todo 
const addPosts = async (event) => {
    // call preventDefault to keep the page from reloading the form and refreshing 
    event.preventDefault();
    console.log("alec")
    //generate new form data object
    let formData = new FormData(event.target);

    // generate  a javascript Objext from the form data object created above 
    let formDataASObject = Object.fromEntries(formData);

    try {
        const loginData = getLoginData();
        // we make a fetch POST request to create a todo in the API
        const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",

            {
                method: "POST",
                headers: {
                    
                    Authorization: `Bearer ${loginData.token}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
                // take the data from the form and build the body of the request
                body: JSON.stringify(formDataASObject)
                
            }
        );
        // turn the response into somthing we can work with 
        const newPost = await response.json();

        console.log(newPost)
    } catch (error) {

        console.log("HELP!!!!!!")


    }

}



// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
function logout() {
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



