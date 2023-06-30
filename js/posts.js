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