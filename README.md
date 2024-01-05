# Enjoy the Microblog Project and the MicroblogLite API!



# Welcome and Introduction!
This production timeline was enforced to be completed as below within **3.5 days.** 
This project consists of **4 pages:**
> ::Registration::, ::Login::, ::Posts::, ::Profile::
**Full Basic Requirements were met** for this project and will be elaborated below.


# Registration Page
> Author: Jayla Young
**1.** Functioning Sign-Up Form, While Addressing If The User Already Exists
**2.** After The User Successfully Creates An Account, The User Is Notified As Well
**3.** Regardless Of Advising The User, They Exist Already Or Not, They Can Be Redirected To The "Login" Page With A Click


(attach photos)


# Login Page
> Author: Dara Fuller
**1.** Site Name, Clarification
**2.** Login Form That Can Redirect User To "Posts" Page
**3.** Link to Registration Page For "New Users"


(attach photos)


# Posts Page
> Author: Bianca Tate
**1.** Prevent Access and Gate Keep Unregistered Users To This Page
**2.** Once Logged In, The User Is Dynamically Presented All Social Media That Have Been Posted to the "MicroblogLite API" From Users
**3.** If Logged In, The User Is Provided A Link To Profile Pages
**4.** The User Can Functionally Logout From Of Their Social Profile


(attach photos)


# Profile Page
> Author: Kelly Polanco
**1.**
**2.**
**3.**
**4.**


(attach photos)



## Code Blocks
> The Following Code Below Is Just A Piece Of A Function That Assist To Display A Custom Confirmation Message When A New Post Is Successfully Added To The Microbloglite Api. This Was Achieved From Values Called From The "Create Post Form."

```javascript
fetch(apiBaseURL + "/api/posts", options)
    .then(response => response.json())
    .then(post => {
      console.log(post.text)
      let confirmationMessage =
        document.getElementById("newPost");
      confirmationMessage.innerHTML = "New Post Item Added";
    });
```
