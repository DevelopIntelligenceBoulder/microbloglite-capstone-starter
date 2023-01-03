window.onload = () => {
    let password = document.getElementById('passwordField1');
    let confirmPassword = document.getElementById('passwordField2');


        //call a function that will make sure our passwords match and are valid
        password.onchange = checkPasswords;
    }

function checkPasswords(){
    let pass = document.getElementById('passwordField1').value;

    if (pass[0] != pass[0].toUpperCase()){
        console.log(pass[0] != pass[0].toUpperCase())
        let passFeedback = document.getElementById('passwordField1Feedback')
        passFeedback.className = 'invalid-feedback';
        passFeedback.innerHTML = "Error";
    }
}