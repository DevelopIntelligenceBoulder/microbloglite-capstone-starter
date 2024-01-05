document.addEventListener("DOMContentLoaded", e => {

    registerbutton.addEventListener("click", async e => {
        user = await api.register({ 
            username: username.value, 
            fullName: fullName.value, 
            password: password.value 
        });
        window.location = "./index.html"
    });

});