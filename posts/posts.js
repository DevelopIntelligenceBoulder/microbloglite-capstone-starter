// Function to get all users via fetch()
function getAllUsers() {
    // GET /api/users
    const loginData = getLoginData();
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };
    // note:the api variable is defined in auth.js
    fetch(api + "/api/users", options)
        .then(response => response.json())
        .then(users => {
            // Do something with the users array...
            console.log(users);
        });
}