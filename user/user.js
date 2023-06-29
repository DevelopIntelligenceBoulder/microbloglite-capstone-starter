'use strict';

document.addEventListener('DOMContentLoaded', async function() {    
    // get everything here so we dont have to keep refetching
    const loggedInUser = getLoginData(),
          queryParams  = getQueryParams();
    const postForm = document.querySelector("#post-form");
    
    try {
        const profileUser = await getUserByUsername(queryParams?.username || loggedInUser.username);
        try {
            var userPosts = await loadPosts(profileUser);      
            loadInfo(profileUser, userPosts);
        } catch (error) {
            throw error // lol
        }
    } catch (error) {
        window.location.replace("/user");
    }
    
    async function loadInfo(profileUser, userPosts) {
        updateVisibility(profileUser);

        document.querySelector("#user-fullname").textContent = profileUser.fullName;
        document.querySelector("#username").textContent      = `@${profileUser.username}`;
        document.querySelector("#user-bio").textContent      = profileUser.bio;
        document.querySelector("#num-posts").textContent     = userPosts.length;
    }
    
    async function loadPosts(profileUser) {
        userPosts = await getPosts(profileUser.username);
    
        // sort from newest to oldest
        // userPosts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        // userPosts.forEach((post) => addPost(post, loggedInUser));
        for (const post of userPosts) {
            await addPost(post, loggedInUser);
        }

        return userPosts;
    }

    function updateVisibility(profileUser) {
        if (profileUser.username != loggedInUser.username) {
            document.querySelectorAll(".edit-profile-btn").forEach(e => e.classList.add("d-none"));
            document.querySelector("#post-form").classList.add("d-none");
            return;
        }
        document.querySelectorAll(".edit-profile-btn").forEach(e => e.classList.remove("d-none"));
        document.querySelector("#post-form").classList.remove("d-none");
        return;
    }

    postForm.elements.postBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const postText = postForm.elements.text;
        await createPost(postText.value);

        // reset textarea and reload posts
        postText.value = "";
        clearPosts();
        loadPosts().then(loadInfo);
    })
});