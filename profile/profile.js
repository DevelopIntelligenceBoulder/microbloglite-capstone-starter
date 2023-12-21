// Function to create post via fetch ()
function createPost (){
    // POST /api.users

    const loginData = getLoginData();
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };
    // note the api variable is defined in auth.js
    fetch(api + "/api/users", options)
    .then(response => response.json());
    .then(users => {
        // Do something with users array...
        console.log(users);
    });
}
