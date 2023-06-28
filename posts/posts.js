/* Posts Page JavaScript */
// fetch all posts from users

function displayUserName() {
  const loginData = getLoginData();
  const welcomeMessage = document.querySelector("#welcomeMessage");
  welcomeMessage.textContent = `Welcome, ${loginData.username}`;
}

displayUserName();

var main = function() {
  $('.btn.btn-primary').click(function() {
    var post = $('.status-box').val();
    $('<li>').text(post).prependTo('.posts');
    $('.status-box').val('');
    $('.counter').text('140');
    $('.btn').addClass('disabled'); 
  });
  
  $('.status-box').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);
  
    if(charactersLeft < 0) {
      $('.btn').addClass('disabled'); 
    }
    else if(charactersLeft == 140) {
      $('.btn').addClass('disabled');
    }
    else {
      $('.btn').removeClass('disabled');
    }
  });
  
  $('.btn').addClass('disabled');
}

$(document).ready(main);
