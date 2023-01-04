"use strict"

window.onload = function () {

  let postBtn = document.getElementById("postBtn");
  postBtn.onclick = postBtnOnClick;

  displayPost();
  
  document.getElementById("name").innerText = (loginData()).username

  console.log(getLoginData())
  //setInterval(displayNews, 10000);
};

function loginData () {
  // let name = document.getElementById("name")
  // name.textContent =  JSON.parse(window.localStorage.getItem("login-data")) || {};
  
  // return name;
  let loginData = getLoginData()
  return loginData;
}


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
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${(loginData()).token}`
      
    },
  };

  fetch('https://microbloglite.herokuapp.com/api/posts/', options)
    .then(response => {
     console.log(data)
      if (response.ok) {
        
        inputElement.value = '';
      }
    });

    

}


function displayPost() {

  let options = {
   

    headers: {
      "Content-Type": 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpbGwiLCJpYXQiOjE2NzI3NjI1MTEsImV4cCI6MTY3Mjg0ODkxMX0.p8lcNFPuDyrJScWUrycGaEhwTSMyN8VE-hxSbKo2rZk'
    }
  };
 
  fetch('https://microbloglite.herokuapp.com/api/posts/63b48aa85f3f1f9a6950b481',options)
    .then(response => response.json())
    .then(data => {
      let displayPost = document.getElementById('home-tab-pane');

  
      displayPost.textContent = JSON.stringify(data.text);
      console.log(data)
    });
}

