let postContainer = document.getElementById('postList');

fetch("api/posts",{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})
.then(res => res.json())

.then(data => {
    console.log(data);
    data.forEach(post => {
        let postElement = document.createElement('div');
        postElement.innerHTML = `
            <p>${post.text}</p>
            <p>${post.username}</p>
            <button>Like</button>

        `;
        postContainer.appendChild(postElement);
    })
})