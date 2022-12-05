
 const $q = (s) => document.querySelector(s);


const registratonForm = $q("#registration");
const fullName = $q("#regFullName")
const userName = $q("#regUsername");
const password = $q("#regPassword");

function registerNewUser(event) {
     event.preventDefault();

    const bodyData = {
        username: userName.value,
        fullName: fullName.value,
        password: password.value
    }

    fetch("https://microbloglite.herokuapp.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(bodyData)
    }).then((response) => response.json)
        .then((user) => {
            console.log(user);
            window.location.href = "./index.html";
            sessionStorage.message = `Welcome ${userName.value}`
        })
        .catch((err) => {
            console.log(err);
            
    })

}




window.onload = () => {
    registratonForm.onsubmit = registerNewUser; 
}