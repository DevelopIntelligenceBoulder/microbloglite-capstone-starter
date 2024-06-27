console.log("Hiya!")

window.onload = () => {

    let deleteCommentButton = document.querySelector("#deleteCommentButton");

    deleteCommentButton.addEventListener("click", deleteTheCourse);

    displayPost();

    let commentDropdown = document.querySelector("#chooseComment");

    commentDropdown.addEventListener("change", displayUsersPost)

}
const displayPost = async () => {


    // Getting a hold of the container where posts will be displayed
    let commentDropdown = document.querySelector("#chooseComment");

    let allPosts = await getPosts();

    let defaultOption = document.createElement("option");
    defaultOption.value = "0";

    defaultOption.innerText = "----Select a Comment----";

    commentDropdown.appendChild(defaultOption);

    // running a loop through data to work with it individually 
    allPosts.forEach((post) => {


        if (post.username === localStorage.username) {

            let newOption = document.createElement("option");

            //set the value for the option
            newOption.value = post._id;

            //set what the user sees 
            newOption.textContent = post.text;

            commentDropdown.appendChild(newOption);

        }


    });




}

const displayUsersPost = async () => {

    // Getting a hold of the container where posts will be displayed
    let userComment = document.querySelector("#commentDetails");

    let commentDropdown = document.querySelector("#chooseComment");

    // Clear previous content if needed
    userComment.innerHTML = '';

    //  calling the fetch request made with avaliable data
    let allUserPosts = await getPosts();

    // running a loop through data to work with it individually 
    allUserPosts.forEach((post) => {

        // display data in a prettier way
        let date = new Date(post.createdAt).toLocaleString();

        if (post._id === commentDropdown.value) {
            userComment.innerHTML += `
       <div class="post">
               <span class="username">Username: ${post.username}</span><br>
               <span class="comment">Comment: ${post.text}</span><br>
               <span class="date">Posted at: ${date}</span><br>
           </div><hr>`;

        }


    });

}

const deleteTheCourse = async () => {

    let commentDrop = document.querySelector("#chooseComment");

    //try catch for error handling
    try {

        const loginData = getLoginData();

        //make a fetch (DELETE) request to remove a comment in the API
        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/" + commentDrop.value,
            {
                method: "DELETE",
                headers: {
                    // This header is how we authenticate our user with the
                    // server for any API requests which require the user
                    // to be logged-in in order to have access.
                    // In the API docs, these endpoints display a lock icon.
                    Authorization: `Bearer ${loginData.token}`,
                },
            });

        

            

            if (response.ok) {
                window.location.href = "/profile/index.html";
            } else {
                console.error("DELETE request failed:", response.statusText);
            }
        } catch (err) {
            console.error("Error deleting the course:", err);
        }
    };


const getPosts = async () => {

    const loginData = getLoginData();

    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`
        }
    })

    const data = await response.json();

    // do something with the posts
    console.log(data);

    return data

}