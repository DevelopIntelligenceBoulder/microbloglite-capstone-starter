# Capstone Project: MicroBlog-Social garden
### About Social Garden
Social Garden is a "microblogging" website where a user to share thought and view what others have to say. The website consist of HTML, CSS, BootStrap, and JavsScript usage. Users are to log-in or make an account that allows them access to view and make post. Once they have made a user they then are lead to the home page that plays music when opened and a scroll box of comments made from most recent. They can then look at their profile where they look at the comments theyve made and have an option to create a new one as well as delete. The theme was inspired to have a gothic/rock feel. 

**Features**  
- Log-in Page
- Register Page
- Home Page
- Profile Page
- Delete Comment Page


## Log-in Page
![log-inpage](/images/loginpage.PNG)

## Register Page
![registerPage](/images/registrationpage.PNG)

## Home Page
![homePage](/images/homePage.PNG)

## Profile Page
![ProfilePage](/images/profilePage.PNG)

## Delete Page
![deletePage](/images/deletePage.PNG)

## Delete Comment Page

## Intresting code
A piece of code that I would say I find intresting was adding the music to play when one is on the profile or post page. It took me a while to figure out the styling and how to get the music to automatically play once someone is on the page. This is a new feature for me. 
```javascript

   <div style="text-align: center;" class="text-light ">
        <p style="font-family:'Jacquard 12'" id="welcomeIntro">Welcome to Your Garden,<p id="usersName" style="font-family:'Jacquard 12'"></p>
        <p>
    </div>
    <div class="mt-4" id="audiomp">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="audio-player" id="playMusic">
                    <audio controls autoplay loop>
                        <source src="/audio/Soundgarden   Black Hole Sun With Lyrics.mp3" type="audio/mpeg">

                    </audio>
                </div>
            </div>
        </div>
    </div>

```
This is the CSS for it

```javascript

.audio-player {
    background-color:transparent;
    padding: 15px;
    border-radius: 8px;
    text-align: right; /* Aligns content inside the .audio-player div to the right */
    color: #fff;
    
    
}
.audio-player audio {
    width: 100%;
   
}
.audio-player audio::-webkit-media-controls-panel {
    background-color: #6a6868;
    color: #524949;
    border-radius: 8px;
    
}

```