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

function logout() {
  // Send a fetch request to the server to log out the user
  fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlYW45NjMiLCJpYXQiOjE2ODc5NjYzNTEsImV4cCI6MTY4ODA1Mjc1MX0.7BISthP7YkxR8HNv-YxTIob4XOQ3uKZ2v8-mOAnAPsE'
    },
    body: JSON.stringify({ logout: true })
  })
    .then(response => {
      if (response.ok) {
        // Perform any necessary cleanup or session removal on the client-side
        // Redirect to index.html or any desired page
        window.location.href = "index.html";
      } else {
        // Handle error response
        console.error('Logout request failed');
      }
    })
    .catch(error => {
      // Handle fetch error
      console.error('Error during logout request:', error);
    });
}

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
function addComment() {
  // Retrieve the comment input
  var commentInput = document.getElementById('commentInput').value;

  // Create a new comment card dynamically
  var commentCard = document.createElement('div');
  commentCard.className = 'card comment-card';
  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  var commentText = document.createElement('p');
  commentText.className = 'card-text';
  commentText.textContent = commentInput;
  cardBody.appendChild(commentText);
  commentCard.appendChild(cardBody);

  // Add the new comment card to the comment container
  var commentContainer = document.getElementById('commentContainer');
  commentContainer.appendChild(commentCard);

  // Clear the comment input field
  document.getElementById('commentInput').value = '';
}
function logout() {
  // Perform any necessary logout actions here
  
  // Redirect the user to the index.html page
  window.location.href = "index.html";
}