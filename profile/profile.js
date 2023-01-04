"use strict"

window.onload = function () {

  let postBtn = document.getElementById("postBtn");
  postBtn.onclick = postBtnOnClick;

  //setInterval(displayNews, 10000);
};


function displayNews() {
  let displayNews = document.getElementById("displayNews");

  fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6be45ffc50ba48769b02fe10f8c5cb69")
    .then(response => response.json())
    .then(data => {
      let newsHTML = "";
      let articleCount = Math.min(data.articles.length, 2);
      for (let i = 0; i < articleCount; i++) {
        let articleIndex = Math.floor(Math.random() * data.articles.length);
        let article = data.articles[articleIndex];
        newsHTML += `
          <div class="article">
            <img src="${article.urlToImage}" alt="${article.title}" style="height: 100px; width: 200px;">
            <p>${article.title}</p>
          </div>
        `;
        if (i < articleCount - 1) {
          newsHTML += "<hr>";
        }
      }
      displayNews.innerHTML = newsHTML;
    })
    .catch(error => {
      console.error("There was an error fetching the news articles:", error);
    });
}





function postBtnOnClick() {

  let inputElement = document.getElementById('post');
  let textToPost = inputElement.value;

  let data = { text: textToPost };


  let options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpbGwiLCJpYXQiOjE2NzIwNzgzMDMsImV4cCI6MTY3MjE2NDcwM30.TcF9VVdZIPE9mEJsXsoRppKx3K3YEZp92lp5982oy9E'
    }
  };

  fetch('https://microbloglite.herokuapp.com/api/posts', options)
    .then(response => {
     
      if (response.ok) {
        
        inputElement.value = '';
      }
    });

    displayPost;

}

function displayPost() {
 
  fetch('https://microbloglite.herokuapp.com/api/posts/63a9e42e45c00975ccf50f52')
    .then(response => response.json())
    .then(data => {
      let displayPost = document.getElementById('home-tab-pane');

  
      displayPost.textContent = "hello";
    });
}



// async function postBtnOnClick() {
//   // Get the text to post
//   let inputElement = document.getElementById('post');
//   let textToPost = inputElement.value;

//   // Get the user's authorization token
//   let token = getUserToken();

//   // Create the data to send in the request
//   let data = { text: textToPost };

//   // Create the request options
//   let options = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   // Send the request
//   let response = await fetch('https://microbloglite.herokuapp.com/api/posts', options);

//   // Check for a successful response
//   if (response.ok) {
//     // Clear the input element
//     inputElement.value = '';
//   }

//   displayPost();
// }

// function getUserToken() {
//   // Get the user's authorization token from wherever it is stored (e.g. a cookie, local storage, etc.)
//   let token = /* get the user's token here */;
//   return token;
// }
