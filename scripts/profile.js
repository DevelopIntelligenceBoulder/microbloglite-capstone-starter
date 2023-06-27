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
// profile.js

function logout() {
  // Perform any necessary logout operations or clear user session if applicable

  // Redirect to index.html
  window.location.href = "index.html";
}

