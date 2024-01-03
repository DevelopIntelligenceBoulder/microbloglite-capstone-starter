/* Posts Page JavaScript */

"use strict";

//Prevent access to the page unless
//the visitor is logged in

//link to profile page

// include logout button *function provided!
// display all posts (display content,
// author, timestamp) *use fetch

//read me explanantion!

document.addEventListener('DOMContentLoaded', function () {
  // Function to get posts from the server
  function getPosts() {
      // Make an API request to get the list of posts
      fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${loginData.token}`
          }
      })
          .then(response => response.json())
          .then(posts => {
              // Retrieved posts
              displayPosts(posts);
          })
  }

  // Function to display posts on the page
  function displayPosts(posts) {
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';

      posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `
              <div class="post-card">
                  <h2>${post.title}</h2>
                  <p>${post.content}</p>
              </div>
          `;
          postsContainer.appendChild(postElement);
      });
  }

    // Get posts when the page loads
    getPosts();
  });