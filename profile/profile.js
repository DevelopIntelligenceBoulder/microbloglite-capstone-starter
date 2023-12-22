const apiUrl = "http://microbloglite.us-east-2.elasticbeanstalk.com/api/";
const options = {
  method: "POST",
  headers: {"Content-Type": "application/json" },
  body: JSON.stringify(getLoginData()),
};

//const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsImlhdCI6MTcwMzI3MTIyNSwiZXhwIjoxNzAzMzU3NjI1fQ.HaGtg5jQeAn9hNqq8tQi0mXivLl-9w1U5YaaKA-YQqg

console.log(getLoginData().token);

fetch(apiUrl + "users/",options)
  .then((res) => res.json())
  .then((users) => {
    console.log(users);
  });
