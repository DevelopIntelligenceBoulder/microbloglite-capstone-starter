# Capstone 3: Microblog Network

### Description: 

In a collaborative effort, we built a microblogging website called Nature's Nook. Users can share brief insights, create accounts, and post content, with an option to like posts. The website, a "walled garden," requires users to log in to view content. Using HTML, CSS, and JavaScript, we developed four essential pages: a landing/login page, a registration page, a posts page, and a profile page, fostering a secure and engaging online community.


## Landing/Login Page

The home page has a simple, responsive design with a navbar linking to the Register page and a login form.

<p align="center" width="100%">
    <img width="90%" src="images/landing-page.png" /> 
</p>


## Registration Page

The registration page has a registration form utilizing Bootstrap to help with responsiveness.

<p align="center" width="100%">
    <img width="90%" src="images/register-page.png" /> 
</p>

## Posts Page

Short description...

<p align="center" width="100%">
    <img width="90%" src="images/" /> 
</p>

## User Profile Page
### Description
- On the profile page you'll find the Author's photo, name, bio, a few things about them, as well as any contact info they'd like to provide to their audience/readers. Along with the Author's personal information, the user will be able to create new blog posts as well as save and edit blog posts from thier drafts. 

### Interesting code snippet

```
function saveDraft(draftData) {
        //saving the draft to local storage
        localStorage.setItem("draftData", JSON.stringify(draftData));

        //informs user of Draft being saved
        alert("Draft has been saved!");
    }

    function getDrafts() {
        // pulling the draft from local storage
        let draftDataLocal = localStorage.getItem("draftData")
        console.log(draftDataLocal);
        blogPostInputEl.value = JSON.parse(draftDataLocal).text;
    }
```
- I found this code to be the most interesting because it allowed me to both save the blog post draft to the local storage as well as retrieve that data back into the textarea for my blog post. It gave me a sense of satisfaction to see my text retrieved from the local data and then be able to publish it.

### Photos
- Photo of a merge conflict that my team had while working together. Just needed to approve changes to the css page.

<p align="center" width="100%">
    <img width="90%" src="./profile/images/MergeConflict.png" /> 
</p>

- Photo of what our profile page looks like currently

<p align="center" width="100%">
    <img width="90%" src="./profile/images/profilePage.png" /> 
</p>

- Photo of the site map for what I was going for when I started the profile page. I thought it would be cool to show how the rough draft and final actually differ as you work towards a project. I would still like to add some of the features in the future though. 

<p align="center" width="100%">
    <img width="90%" src="./profile/images/natureNookSiteMap.png" /> 
</p>


## Responsive Design

All Pages are responsive through the use of Bootstrap 5

<p align="center" width="100%">
    <img width="50%" src="images/register-page-tablet.png" /> 
    <img width="30%" src="images/landing-page-phone.png" /> 
    <!-- <img width="30%" src="images/" /> 
    <img width="30%" src="images/" />  -->
</p>

### Interesting Code

An interesting bit of code is the custom SVG cursors CSS for the website. I had to do some research after the solid color mouse wasn't visible on all of the backgrounds. I created three different cursors and learned how to edit SVG color using fill, stroke, and stroke-width. 

**CSS**
```
body{
    cursor: url('./images/person-hiking-solid-db-lg.svg'), default !important;
}
#logout-btn:hover{
    cursor: url('./images/moon-stars-fill.svg'), auto !important;
}
a:hover, input:hover, textarea:hover, button:hover{
    cursor: url('./images/mountain-solid-y.svg'), auto !important;
}

<svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path opacity="1" fill="#1e140b" stroke="#e8dfe0" stroke-width="14" d="M192 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm51.3 182.7L224.2 307l49.7 49.7c9 9 14.1 21.2 14.1 33.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V397.3l-73.9-73.9c-15.8-15.8-22.2-38.6-16.9-60.3l20.4-84c8.3-34.1 42.7-54.9 76.7-46.4c19 4.8 35.6 16.4 46.4 32.7L305.1 208H336V184c0-13.3 10.7-24 24-24s24 10.7 24 24v55.8c0 .1 0 .2 0 .2s0 .2 0 .2V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V272H296.6c-16 0-31-8-39.9-21.4l-13.3-20zM81.1 471.9L117.3 334c3 4.2 6.4 8.2 10.1 11.9l41.9 41.9L142.9 488.1c-4.5 17.1-22 27.3-39.1 22.8s-27.3-22-22.8-39.1zm55.5-346L101.4 266.5c-3 12.1-14.9 19.9-27.2 17.9l-47.9-8c-14-2.3-22.9-16.3-19.2-30L31.9 155c9.5-34.8 41.1-59 77.2-59h4.2c15.6 0 27.1 14.7 23.3 29.8z"/></svg>
```