// Retrieve the comment cards
const commentCards = document.querySelectorAll('.comment-card');

// Function to filter comments by date
function filterCommentsByDate(date) {
  const commentContainer = document.getElementById('commentContainer');
  commentContainer.innerHTML = ''; // Clear previous comments

  commentCards.forEach((card) => {
    const commentDate = card.querySelector('.text-muted').textContent.trim();
    const commentText = card.querySelector('.card-text').textContent.trim();

    if (commentDate === date) {
      const commentCard = document.createElement('div');
      commentCard.classList.add('card', 'comment-card');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const commentTextElement = document.createElement('p');
      commentTextElement.classList.add('card-text');
      commentTextElement.textContent = commentText;

      const commentDateElement = document.createElement('p');
      commentDateElement.classList.add('card-text', 'text-muted');
      commentDateElement.innerHTML = `<small>${commentDate}</small>`;

      cardBody.appendChild(commentTextElement);
      cardBody.appendChild(commentDateElement);
      commentCard.appendChild(cardBody);
      commentContainer.appendChild(commentCard);
    }
  });
}

// Add event listener to the date search input
const searchInput = document.querySelector('#commentDate');
searchInput.addEventListener('change', (event) => {
  const searchDate = event.target.value;
  filterCommentsByDate(searchDate);
});

// function logout() {
//   // Send a fetch request to the server to log out the user
//   fetch('/logout', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlYW45NjMiLCJpYXQiOjE2ODc5NjYzNTEsImV4cCI6MTY4ODA1Mjc1MX0.7BISthP7YkxR8HNv-YxTIob4XOQ3uKZ2v8-mOAnAPsE'
//     },
//     body: JSON.stringify({ logout: true })
//   })
//     .then(response => {
//       if (response.ok) {
//         // Perform any necessary cleanup or session removal on the client-side
//         // Redirect to index.html or any desired page
//         window.location.href = "index.html";
//       } else {
//         // Handle error response
//         console.error('Logout request failed');
//       }
//     })
//     .catch(error => {
//       // Handle fetch error
//       console.error('Error during logout request:', error);
//     });
// }
const editButton = document.getElementById('editButton');
const cardTitle = document.querySelector('.card-title');
const birthdate = document.querySelector('.card-text[data-field="birthdate"]');
const email = document.querySelector('.card-text[data-field="email"]');

function editProfile() {
  // Enable editing of user information
  cardTitle.contentEditable = true;
  birthdate.contentEditable = true;
  email.contentEditable = true;

  editButton.textContent = 'Save Changes';
  editButton.removeEventListener('click', editProfile);
  editButton.addEventListener('click', saveProfile);
}

function saveProfile() {
  // Disable editing of user information
  cardTitle.contentEditable = false;
  birthdate.contentEditable = false;
  email.contentEditable = false;

  // Send a fetch request to update the user information
  const updatedProfile = {
    name: cardTitle.textContent,
    birthdate: birthdate.textContent,
    email: email.textContent
  };

  fetch('/update-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlYW45NjMiLCJpYXQiOjE2ODc5NjYzNTEsImV4cCI6MTY4ODA1Mjc1MX0.7BISthP7YkxR8HNv-YxTIob4XOQ3uKZ2v8-mOAnAPsE'
    },
    body: JSON.stringify(updatedProfile)
  })
    .then(response => {
      if (response.ok) {
        // Handle successful profile update
        console.log('Profile updated successfully');
      } else {
        // Handle error response
        console.error('Profile update request failed');
      }
    })
    .catch(error => {
      // Handle fetch error
      console.error('Error during profile update request:', error);
    });

  editButton.textContent = 'Edit Profile';
  editButton.removeEventListener('click', saveProfile);
  editButton.addEventListener('click', editProfile);
}

editButton.addEventListener('click', editProfile);
// Client-side code (profile.js)

// Function to add a comment and redirect to the posts page
function addComment() {
  // Get the comment input value
  var commentInput = document.getElementById("commentInput").value;
  
  // Perform any necessary validation or processing of the comment input
  
  // Redirect to the posts.html page with the comment as a query parameter
  window.location.href = "posts.html?comment=" + encodeURIComponent(commentInput);
}






// // Server-side code (Node.js with Express.js)

// const express = require('express');
// const session = require('express-session');
// const app = express();

// // Enable session middleware
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));

// // Middleware to check authentication
// function requireAuth(req, res, next) {
//   if (req.session && req.session.userId) {
//     // User is authenticated, proceed to the next middleware or route handler
//     return next();
//   } else {
//     // User is not authenticated, return an unauthorized status
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// // Route to check if the user is authenticated
// app.get('/check-auth', requireAuth, (req, res) => {
//   // User is authenticated, return a success status
//   res.sendStatus(200);
// });

// // Protect the profile page
// app.get('/profile', requireAuth, (req, res) => {
//   // Render the profile page
//   res.sendFile(__dirname + '/public/profile.html');
// });

// // Other routes and middleware...

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// // Client-side code
// document.addEventListener('DOMContentLoaded', () => {
//   // Check if the user is authenticated before loading the profile.html page
//   function checkAuthentication() {
//     fetch('/check-auth', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + getToken()
//       }
//     })
//       .then(response => {
//         if (response.ok) {
//           // User is authenticated, continue loading the profile page
//         } else {
//           // User is not authenticated, redirect to the login page
//           window.location.href = "login.html";
//         }
//       })
//       .catch(error => {
//         console.error('Error during authentication check:', error);
//       });
//   }

//   // Get the token from local storage
//   function getToken() {
//     return localStorage.getItem('token');
//   }

//   // Call the checkAuthentication function when the page loads
//   checkAuthentication();

//   // Other client-side code...
// });
