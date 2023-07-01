# Enjoy the Microblog Project and the MicroblogLite API!

A project that completed in week where the team was tasked with creating a mock website using MicroBlogs API server.

## Team Members

- Paris Cabrera
- Bemnet Erbeto
- Lester Zalevskiy
- Karmon Gibson
- Ahkeem Kelly

* Below are each of the pages with their respective features. 

## Registartion page

The initial page has the user create an account with a username, fullname and password and email address.

![Registartion-Page](../capstone-final/screenshots/registration.png)

## Login Page

The login page will offer the option for the user to save their credentials for logging in. The login page will redirect the user to the post page if the credentials are correct.

![Login-Page](../capstone-final/screenshots/login.png)

## Post Page

The post page contains a list of post from the server and features a button to add a post as well as add a photo to your post using the cloudinary api. The stretch goals with more time would have been a way to incorporate both servers together and link an image to each users post._id. This would have allowed the user to see images from users who are adding a post about fitness. This feat would have been achieved by creating a filter() function of users with a certain symbol in their username, to make the site look more authentic.

![Post-Page](../capstone-final/screenshots/posts-1.png)
  - Main page after the user logs in takes them to the post page which is a  GET request of all the post on the server limited to the latest 100 posts.
![Post-Page-2](../capstone-final/screenshots/post-2.png)
  - This widget opens using Cloudinary's API to allow the user add an image which is then appended to the post.
![Post-page-emoji-feature](../capstone-final/screenshots/post-3.png)
  - The emoji feature opens an expandable menu of emojis that the user can add to their post.

## Profile-Page

The profile page will allow the user to change their photo using Gravatar API if the user has an account or uses a default image from Gravatar. The profile will also allow the user to modify the username and full Name. Alert will inform the user they will be logged out since the GET request will not work and will invalidate the users Bearer token. The user can also change their full Name as well.

![Profile-page](../capstone-final/screenshots/profile-1.png)
  - Main profile page
![Profile-page-edit-feature](../capstone-final/screenshots/profile-2.png)
  - Edit feature on page allows the user to change their first name or username
![Profile-page-add-photo-feature](../capstone-final/screenshots/profile-3.png)
  - Allows user to add a photo using Gravatar API

