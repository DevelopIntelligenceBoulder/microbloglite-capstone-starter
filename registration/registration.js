"use strict"

window.onload=()=>{

    console.log("Hello World!")

    //grabbing the user form from the html page
    let newUserForm= document.querySelector("#newLoginForm");
    //running the function once the form is submitted to create a new user
    newUserForm.addEventListener("submit", createUser);


}

let createUser = async (event)=>{

    //Keeps the page from reloading too quick
    event.preventDefault();


    //generate a new form data object
    let formData = new FormData(event.target);
    // generate a JavaScript object from the formData created above
    let formDataAsObject = Object.fromEntries(formData);

    //try catch for error handling
    try {
            //make a fetch(POST) request to create new user
        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(formDataAsObject)
        });

        if (!response.ok) {
            throw new Error("Failed to add user. Please try again later.");
        }

         let newUser = await response.json();
         
        console.log(newUser, "this should show up if new user is created");
        
    } catch (error) {
        console.log("Error occurred:", error);
        alert("An error occurred while adding the user. Please try again later.");
    }



}