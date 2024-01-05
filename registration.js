document.addEventListener("DOMContentLoaded", e => {

    registerButton.addEventListener("click", async e => {
        user = await api.register({ 
            username: username.value, 
            fullName: fullName.value, 
            password: password.value 
        });
        window.location = ".."
    });

});