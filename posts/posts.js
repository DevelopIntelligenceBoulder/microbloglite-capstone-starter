/* Posts Page JavaScript */

"use strict";
// Function to handle user logout
async function handleLogout() {
    try {
      await logout();
      console.log('User logged out');
      // Redirect to index.html on successful logout
      window.location.href = '../html/index.html';
    } catch (error) {
      console.error('Logout Error:', error.message);
      // Display error message to the user
      alert('Logout failed. Please try again.');
    }
  }
  
  // Attach event listener to the logout button
  document.getElementById('logoutButton').addEventListener('click', handleLogout);
  

  /*
  Login user (POST /auth/login):
fetch('https://microbloglite.herokuapp.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'your_username',
    password: 'your_password',
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing user information and token
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

  Logout user (GET /auth/logout):
fetch('https://microbloglite.herokuapp.com/auth/logout', {
  method: 'GET',
})
  .then(response => {
    // Handle the response
    console.log('User logged out successfully.');
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Get a list of users (GET /api/users):
fetch('https://microbloglite.herokuapp.com/api/users')
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the list of users
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Create a new user (POST /api/users):
fetch('https://microbloglite.herokuapp.com/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'new_user',
    fullName: 'New User',
    password: 'new_password',
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the created user information
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Get a user by username (GET /api/users/{username}):
fetch('https://microbloglite.herokuapp.com/api/users/username_here')
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the user information
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Update user information (PUT /api/users/{username}):
fetch('https://microbloglite.herokuapp.com/api/users/username_here', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fullName: 'Updated Name',
    // Include any other fields you want to update
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the updated user information
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Get a list of posts (GET /api/posts):
fetch('https://microbloglite.herokuapp.com/api/posts')
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the list of posts
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Create a new post (POST /api/posts):
fetch('https://microbloglite.herokuapp.com/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'New post content',
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the created post information
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Get a post by postId (GET /api/posts/{postId}):
fetch('https://microbloglite.herokuapp.com/api/posts/postId_here')
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the post information
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Delete a post by postId (DELETE /api/posts/{postId}):
fetch('https://microbloglite.herokuapp.com/api/posts/postId_here', {
  method: 'DELETE',
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the success message
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Add a like to a post (POST /api/likes):
fetch('https://microbloglite.herokuapp.com/api/likes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    postId: 'post_id_here',
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the created like information
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });

Remove a like by likeId (DELETE /api/likes/{likeId}):
fetch('https://microbloglite.herokuapp.com/api/likes/likeId_here', {
  method: 'DELETE',
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data containing the success message
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
  */