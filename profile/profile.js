"use strict"

window.onload = function () {

  let postBtn = document.getElementById("postBtn");
  postBtn.onclick = postBtnOnClick;

  displayPost();

  document.getElementById("name").innerText = (loginData()).username

  document.getElementById("accName").innerText = (loginData()).username

  document.getElementById("logout").onclick = logout;

  //setInterval(displayNews, 10000);

  randomName();
   
};

function loginData() {

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

  fetch(api + "/api/posts", options)
    .then(response => {
      console.log(data)
      if (response.ok) {

        inputElement.value = '';
      }
    });
}


// function displayPost() {

//   let options = {
//     headers: {
//       "Content-Type": 'application/json',
//       "Authorization": `Bearer ${(loginData()).token}`
//     }
//   };

//   fetch(`${api}/api/posts?username=${(loginData()).username}`, options)
//     .then(response => response.json())
//     .then(data => {

//       let loggedInUsername = (loginData()).username;
//       let postsByLoggedInUser = data.filter(post => post.username === loggedInUsername);

//       postsByLoggedInUser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       let displayPost = document.getElementById('recentPost');
//       let postsHTML = "";
//       for (let i = 0; i < postsByLoggedInUser.length; i++) {
//         let post = postsByLoggedInUser[i];
//         postsHTML += `
//               <div class="post">
//                 <h2>${post.text}</h2>
//                 <p>${post.createdAt}</p>
//               </div>
//             `;
//       }
//       displayPost.innerHTML = postsHTML;
//     });
// }

function displayPost() {
  let options = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${(loginData()).token}`
    }
  };

  fetch(`${api}/api/posts?username=${(loginData()).username}`, options)
    .then(response => response.json())
    .then(data => {
      
      let loggedInUsername = (loginData()).username;
      let postsByLoggedInUser = data.filter(post => post.username === loggedInUsername);

      postsByLoggedInUser.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      let displayPost = document.getElementById('recentPost');
      let postsHTML = "";
      for (let i = 0; i < postsByLoggedInUser.length; i++) {
        let post = postsByLoggedInUser[i];
        postsHTML += 

        `<div class="card mt-3">
          
          <div class="card-body">
          <img src="../profile/image/user image.jpg" alt="image" height="50" width="50" class="rounded-circle">
          <h5 class="card-title px-2" id="name">${post.username}</h5>
          
            <h5 class="card-title mt-3">${post.text}</h5>
            
          </div>
        </div>`;
}
      displayPost.innerHTML = postsHTML;

      
      let deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
          let postId = event.target.dataset.id;
          deletePost(postId);
        });
      });
    });
}


function deletePost(id) {
  let options = {
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${(loginData()).token}`
    }
  };

  fetch(`${api}/api/posts/${id}`, options)
    .then(response => {
      if (response.ok) {
        // If the DELETE request was successful, display the updated list of posts
        displayPost();
        alert("Post Deleted")
      } else {
        console.error('Error deleting post');
        alert("Post Cannot be Deleted")
      }
    });
}


function randomName(){
  let randomName = document.getElementById("randomName");
  let randomName1 = document.getElementById("randomName1");
  let randomName2 = document.getElementById("randomName2");

  fetch("http://jsonplaceholder.typicode.com/users")
  .then(response => response.json()) 
  .then(data => {
    
    let randomIndex = Math.floor(Math.random() * data.length);
    let randomIndex1 = Math.floor(Math.random() * data.length);
    let randomIndex2 = Math.floor(Math.random() * data.length);
    
    
    while (randomIndex === randomIndex1) {
      randomIndex1 = Math.floor(Math.random() * data.length);
    }
    while (randomIndex === randomIndex2 || randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * data.length);
    }
    
    randomName.innerHTML = data[randomIndex].name;
    randomName1.innerHTML = data[randomIndex1].name;
    randomName2.innerHTML = data[randomIndex2].name;
  });
}





