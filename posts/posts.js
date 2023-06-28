'use strict';

document.addEventListener('DOMContentLoaded', async function() {    
    const loggedInUser = getLoginData();

    const postForm = document.querySelector("#post-form");
    const postTextarea = postForm.elements.text;
    const postBtn = postForm.elements.postBtn;

    loadPosts();

    async function loadPosts() {
        const userPosts = await getPosts(loggedInUser.username);
    
        // sort from newest to oldest
        userPosts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        userPosts.forEach((post) => addPost(post, loggedInUser));
    }

    postBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();

        if (postTextarea.value.trim() === "") {
            alert("Cannot post an empty Ribbit!");
            return;
        }

        await createPost(postTextarea.value);

        // reset textarea and reload posts
        postTextarea.value = "";
        clearPosts();
        loadPosts();
    });
});
