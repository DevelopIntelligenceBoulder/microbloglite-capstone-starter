document.addEventListener('DOMContentLoaded', function() {
    // TEMP CODE (just so we can see the post)
    let posttemp = document.querySelector("#ribbit-post");
    let samplepost = posttemp.content.cloneNode(true);
    samplepost.querySelector("#post-delete-btn").classList.remove("d-none");
    posttemp.parentNode.appendChild(samplepost);
})

async function loadPosts(params) {
    // TODO
}

async function getJSON(url) {
    const response = await request(url)
    return await response.json();
}

async function postJSON(url, object) {
    const response = await request(url, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(object)
    });
    return await response.json();
}

async function putJSON(url, object) {
    const response = await request(url, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(object)
    });
    return await response.json();
}

async function request(url, options={}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorDetails = await response.json();
        throw errorDetails;
    }
    return response;
}