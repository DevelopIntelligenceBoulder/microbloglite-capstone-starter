import key from "./key.js";

let emojiCont = document.getElementById('default');
let postTextarea = document.getElementById('postTextarea');
const emojiContainer = document.getElementById('emojiContainer');
let resetBtn =  document.getElementById('resetBtn')
let isEmojiClicked = false;

function getAllEmojis() {
  fetch(`https://emoji-api.com/emojis?access_key=${key}`)
    .then(response => response.json())
    .then(data => {
      displayEmojis(data);
      addEmojiClickListeners(data);
    })
    .catch(error => {
      console.error('Error fetching emoji data:', error);
    });
}

function displayEmojis(emojis) {
  emojiContainer.classList.remove('hide');
  document.querySelector('.default').classList.add('hide');
  document.querySelector('.x').classList.remove('hide');
  emojiContainer.classList.add('slideDown');
  emojiContainer.innerHTML = '';

  emojis.forEach(emoji => {
    const emojiSpan = document.createElement('span');
    emojiSpan.setAttribute('id', 'emojiChar')
    emojiSpan.textContent = emoji.character;
    emojiContainer.appendChild(emojiSpan);
  });
}

function addEmojiClickListeners(emojis) {
  const spanElements = document.querySelectorAll('#emojiChar')

  spanElements.forEach(function(spanElement) {
    spanElement.addEventListener('click', function() {
      if (!isEmojiClicked) {
        isEmojiClicked = true;
        const emoji = spanElement.textContent;
        postTextarea.value += emoji;
        setTimeout(function() {
          isEmojiClicked = false;
        }, 200);
      }
    });
  });
}

function xClick() {
  emojiContainer.classList.add('hide');
  emojiContainer.classList.remove('slideDown');
  document.getElementById('default').classList.remove('hide');
  document.getElementById('x').classList.add('hide');
}

document.getElementById('x').addEventListener('click', xClick);
postTextarea.addEventListener('click', xClick);
window.onscroll = xClick;
emojiCont.addEventListener('click', getAllEmojis);

function reset(){
    postTextarea.addEventListener('input', function(){
        if (this.value !== ''){
            resetBtn.classList.remove('hide')

        } else {
            if (!(resetBtn.classList.contains('hide'))){
            resetBtn.classList.add('hide')
            }
        }
    })
}
// resetButton.addEventListener('click', function(){
//     postTextarea.value = null
//     this.classList.add('hide')
// })
// reset()

document.getElementById('addPostButton').addEventListener('click', xClick)