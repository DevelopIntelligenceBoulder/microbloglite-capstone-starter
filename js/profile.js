// Function to handle post form submission
async function handlePost(event) {
    event.preventDefault();
  
    const postContent = document.getElementById('postContent').value;
  
    try {
      const response = await fetch('https://microbloglite.herokuapp.com/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: postContent })
      });
      const data = await handleAPIError(response);
      console.log('Post created:', data);
      // Clear the form
      document.getElementById('postForm').reset();
      // TODO: Display the new post on the page
    } catch (error) {
      console.error('Post Error:', error.message);
      // Display error message to the user
      alert('Failed to create post. Please try again.');
    }
  }
  
  // Attach event listener to the post form
  document.getElementById('postForm').addEventListener('submit', handlePost);
  