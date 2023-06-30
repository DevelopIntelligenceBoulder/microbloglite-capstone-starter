# Enjoy the Microblog Project and the MicroblogLite API!

Don't forget to read the [_MicroblogLite_ API docs](https://microbloglite.herokuapp.com/docs/) and experiment with the API in _Postman!_

Practice and experimentation provide experience, and experience provides confidence.

## Collaborators

- Carlos Guardado
- Adan Cruz
- Andrew Muok
- Arondre Shelton

## Code Review

- Carlos: a small piece of code that I enjoyed doing was adding topic options to select from whenever a user is creating a new post. I definitely believe that it would be a cool feature to have in a blogging page, that way the reader can see what type of post it will be by just adding a topic.

- Adan: The toughest part of this project, for me anyways, was dynamically generating a like button, to add and remove likes, for every post on the page. After trying various methods, I finally got it working by setting an onclick event that calls a function to either remove or like a post. Once clicked the button will call a fetch requests and then change the onclick to call the opposing funciton. For example if a button is clicked to remove a like that button's properties will change as follows:

```
        const clickedBtn = document.querySelector(`button[id='${postId}']`);
        clickedBtn.setAttribute("onclick", `likePost(this.id)`);
        clickedBtn.removeAttribute("class");
        printLikes(postId, clickedBtn);
```

A class is added/removed to visually reperesent if the post is liked. A function printLikes is also called to get an accurate count of likes.

## And another section here
