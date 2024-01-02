window.onload = ()=>{
    let formEl = document.getElementById("register");
    formEl.onsubmit = (event) => {
        event.preventDefault();

        let nameEl = document.getElementById("name").value;
        let userNameEl = document.getElementById("userName").value;
        let passwordEl = document.getElementById("password").value;
        let conformationEl = document.getElementById("password-conformation").value;
        
        
        let currentFormData = {
            name: nameEl,
            username: userNameEl,
            password: passwordEl,
            passwordConformation: conformationEl
        };
        console.log(currentFormData);
        fetch(apiBaseURL + "/api/users", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(currentFormData),
        })
        .then((res)=>{
            if(passwordEl === conformationEl){
                res.json()
            }
        })
        .then((data)=> {
            console.log(data);
        })
    };

}