'use strict';

document.addEventListener('DOMContentLoaded', async function() {    
    // get everything here so we dont have to keep refetching
    const loggedInUser = getLoginData(),
          queryParams  = getQueryParams(),
          profileUser  = await getUserByUsername(queryParams?.username || loggedInUser.username),
          userPosts    = await getPosts(profileUser.username);
    
    const postForm = document.querySelector("#post-form");
    
    loadInfo();
    loadPosts();
    
    async function loadInfo() {
        updateFormVisibility();

        document.querySelector("#user-fullname").textContent = profileUser.fullName;
        document.querySelector("#username").textContent      = `@${profileUser.username}`;
        document.querySelector("#user-bio").textContent      = profileUser.bio;
        document.querySelector("#num-posts").textContent     = userPosts.length;
    }
    
    async function loadPosts() {
        const userPosts = await getPosts(profileUser.username);
    
        // sort from newest to oldest
        userPosts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        userPosts.forEach((post) => addPost(post, loggedInUser));
    }

    function updateFormVisibility() {
        if (profileUser.username != loggedInUser.username) {
            return document.querySelector("#post-form").classList.add("d-none")
        }
        return document.querySelector("#post-form").classList.remove("d-none");
    }

    postForm.elements.postBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const postText = postForm.elements.text;
        await createPost(postText.value);

        // reset textarea and reload posts
        postText.value = "";
        clearPosts();
        loadPosts();
        loadInfo();
    })
});