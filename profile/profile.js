window.onload = () => {
    // Created a container for the form using the id
    let publishForm = document.getElementById("publish-form");

    // Created a container for all fields in the form using their id's
    let titleInputEl = document.getElementById("title");
    let blogPostInputEl = document.getElementById("blog-post");


    publishForm.onsubmit = (e) => {
        // Preventing the default form submission to avoid a page reload.
        e.preventDefault();

        let currentFormData = {
            title: titleInputEl.value, 
            blogPost: blogPostInputEl.value,
        };

        // check which button was clicked
        if (e.submitter.value === "Draft") {
            //save the draft to local starage
            saveDraft(currentFormData);
        } else {
            //publsh the post using fetch API
            publishPost(currentFormData);
        }
    };

    function saveDraft(draftData) {
        //saving the draft to local storage
        localStorage.setItem("drafteData", JSON.stringify(draftData));

        //informs user of Draft being saved
        alert("Draft has been saved!");
    }

    function publishPost(postData) {
        // publishing the post to the api
        fetch(apiBaseURL + "/api/posts", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${logindata.token}`,
            },
            body: JSON.stringify(postData),
        })
            .then((res)=>res.json())
            .then((newBlogPost)=> {
                location.href = `/posts.html id=${newBlogPost.id}`;
            });
    }
};