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

        fetch(apiBaseURL + "/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(currentFormData),
        })
            .then((res)=>res.json())
            .then((newBlogPost)=> {
                location.href = `/posts.html id=${newBlogPost.id}`;
            })
    }
}