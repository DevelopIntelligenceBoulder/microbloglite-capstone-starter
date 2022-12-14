//
document.getElementById("registration").onclick(function(event) {
    event.preventDefault();
    
    let email= document.getElementById("username").value
    let password = document.getElementById("password").value
    
    //fetch all users
    fetch("api/users",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        //Does a match return for the email
        for (let i = 0; i < data.length; i++) {
            if (email === data[i].username) {
                alert("This email is already in use")
                return
            }
            //If not, then create a new user
            else {
                fetch("api/users",{
                    method: "POST",
                    body: JSON.stringify({
                        username: email,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                debugger
                document.getElementById("registration").reset();
            }
        }})
    })


