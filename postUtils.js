'use strict';

async function addPost(post, loggedInUser) {
    const author = await getUserByUsername(post.username);
    const postTmpl = document.querySelector("#ribbit-post");
    const postDiv = postTmpl.content.cloneNode(true);

    if (post.username == loggedInUser.username) {
        postDiv.querySelector("#post-delete-btn").classList.remove("d-none");
    }

    postDiv.querySelector("#post-author-fullname").textContent = author.fullName;
    postDiv.querySelector("#post-author-username").textContent = `@${author.username}`;
    postDiv.querySelector("#post-content").innerText = post.text;

    // TODO: Add listeners for the Like, Reribbit, and Delete buttons

    postTmpl.parentNode.appendChild(postDiv);
}

function clearPosts() {
    document.querySelectorAll(".ribbit-post").forEach((e) => e.remove());
}