
function getMessageHTML(m) {
    return `
        <fieldset id="chirp">
        <legend>Chirps</legend>
        <label>
            <div class="name">Username:</div><input readonly="readonly" value="${m.username}">
        </label>
        <label>
            <div class="name">Text:</div><input readonly="readonly" value="${m.text}">
        </label>
        <label>
            <div class="name"></div><input type="button" value="LIKE" onclick="like('${m._id}')">
            ${m.likes.length} likes.
        </label>
        </fieldset>
    `;
}
async function post(messageText){
    await api.post("/api/posts", {text: messageText}, localStorage.token);
    showMessages(localStorage.username)
    userList.value = localStorage.username;
}

function like(id){
    api.post("/api/likes", {postId: id}, localStorage.token);
}

async function showMessages(username = "") {
    let url = "/api/posts"
    messages = await api.get(url, localStorage.token);
    if (username != "") {
        messages = messages.filter(m=>m.username == username)
    }
    results.innerHTML = messages.map(getMessageHTML).join("")
}

function getUserOption(u){
    return `<option>${u.username}</option>`
}

document.addEventListener("DOMContentLoaded", async e => {
    const users = await api.get("/api/users", localStorage.token)
    userList.innerHTML += users.map(getUserOption).join("")

    showMessages(); //ALL

    userList.addEventListener("change", async e => {
        showMessages(userList.selectedOptions[0].value)
    });

});


