'use strict';

document.addEventListener('DOMContentLoaded', async function() {    
    const loggedInUser = getLoginData();

    const postForm = document.querySelector("#post-form");
    const postTextarea = postForm.elements.text;
    const postBtn = postForm.elements.postBtn;

    loadPosts();

    async function loadPosts() {
        const userPosts = await getPosts();

        console.log(userPosts);
    
        // sort from newest to oldest
        //userPosts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        // userPosts.forEach((post) => addPost(post, loggedInUser));
        for (const post of userPosts) {
            await addPost(post, loggedInUser);
        }
    }

    postBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();

        Swal.fire({
            title: '<strong>Cannot post an empty Ribbit!</strong>',
            imageUrl: 'https://th.bing.com/th/id/OIP.pxz5dUW_3Qk5HAWyGt0TVQAAAA?pid=ImgDet&rs=1',
            imageWidth: 150,
            imageHeight: 110,
            imageAlt: 'Custom image',            html: '<div style="color:#F8BB86">You need to type something in the post box before submitting.</div>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Got it!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
          })
        
          

        await createPost(postTextarea.value);

        // reset textarea and reload posts
        postTextarea.value = "";
        clearPosts();
        loadPosts();
    });
});
