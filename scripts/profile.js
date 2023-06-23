
    // Sample comments data
    const comments = [
        {
            content: "How do I access and utilize APIs properly?",
            date: "June 10, 2023"
        },
        {
            content: "Thank you for the response, Matt!",
            date: "June 5, 2023"
        }
        // Add more comments here
    ];

    // Function to dynamically insert comments
    function insertComments() {
        const commentTemplate = document.getElementById("comment-template");

        const commentContainer = document.querySelector(".profile-comments .card-body");

        comments.forEach(comment => {
            const clone = commentTemplate.content.cloneNode(true);
            clone.querySelector(".card-text").textContent = comment.content;
            clone.querySelector(".text-muted").textContent = comment.date;

            commentContainer.appendChild(clone);
        });
    }

    // Call the function to insert comments
    insertComments();

