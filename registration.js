window.onload = ()=>{
    const submit = document.getElementById("submit");
    submit.onclick = newUser;
}
const api = "https://microbloglite.herokuapp.com";
const userName = document.getElementById("userName")
const fullName = document.getElementById("fullName")
const passWord = document.getElementById("passWord")
function newUser(event) {
    event.preventDefault()
    const registration = {
        username: userName.value,
        fullName: fullName.value,
        password: passWord.value
    }
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
    };
fetch(api +"/api/users", options).then(response=>response.json()).then(registration =>{
    window.location.assign("./index.html")
})
  
}