const apiUrl = "http://microbloglite.us-east-2.elasticbeanstalk.com/api/";
const {token, username} = getLoginData();
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

//const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsImlhdCI6MTcwMzI3MTIyNSwiZXhwIjoxNzAzMzU3NjI1fQ.HaGtg5jQeAn9hNqq8tQi0mXivLl-9w1U5YaaKA-YQqg

console.log(username);

fetch(apiUrl + "users/", options)
  .then((res) => res.json())
  .then((users) => {
    console.log(getLoginData());
    console.log(users);
  });
