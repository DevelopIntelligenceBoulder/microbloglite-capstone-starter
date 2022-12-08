/* Posts Page JavaScript */
"use strict";
//post form
//create selectors for form
// create a selector for variable to get input
const submit=document.querySelector('#submit');
const createPost=document.querySelector('#create-post');
const feed=document.querySelector('.feed');
const feeds=document.querySelector('.feeds');
const user=document.querySelector('.user');

const loginData = getLoginData();

function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


function displayProfilePost() {
    const postAPI = "https://microbloglite.herokuapp.com/api/posts";
    const options = {
        method: "GET",
        headers: {
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };
    const profileName = loginData.username;

    fetch(postAPI, options)
        .then((response) => response.json())
        .then((posts) => {
            posts.forEach((post) => {
                if (profileName == post.username) {
                    card(post, cardSection);
                }
            });
        });
}

function savePost(event) {
    event.preventDefault();
    const bodyData = {
        text: text.value,
    };

    fetch("https://microbloglite.herokuapp.com/api/posts", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${loginData.token}`,
            },
            body: JSON.stringify(bodyData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            card(data, cardSection);

            // $('#text').value('');
            document.getElementById('text').value = '';
            // delete 
            // displayProfilePost();
            // window.location.href = "./profile.html"
        })
        .catch((err) => {
            console.log(err);
        });
}
function card(section, data) {
    // show 
    let postContent = $('.feeds');

    let result = JSON.stringify(section);

    let resultHtml = `<div class="feed">
    <div class="head">
    <div class="user">
    <div class="profile-photo">
    <img src="./images/profile-13.jpg">
    </div> 
    <div class="ingo">
    <h3>Diana Santos</h3>
    <small>Dubai, 15 MINUTES AGO</small>
    </div> 
    </div>
    <span class="edit">
        <i class="uil uil-ellipsis-h"></i>  
    </span>
    </div> 
    
    <div class="photo">
    <img src="./images/feed-3.jpg">
    </div>
    
    <div class="action-buttons">
    <div class="interaction-buttons">
        <span><i class="uil uil-heart"></i></span>
        <span><i class="uil uil-comment-dots"></i></span>
        <span><i class="uil uil-share-alt"></i></span>
    </div>
    <div class="bookmark">
        <span><i class="uil uil-bookmark-full"></i></span>
    </div>
    </div>
    
    <div class="liked-by">
        <span><img src="./images/profile-10.jpg"></span> 
        <span><img src="./images/profile-4.jpg"></span> 
        <span><img src="./images/profile-15.jpg"></span>
        <p>Liked by <b>Rayna Bell</b> and <b>2,323 others</b></p>
    </div>
    
    <div class="caption">
    <p><b>Diana Santos </b>Lorem ipsum dolor sit quisquam eius. <span class="harsh-tag">#lifestyle</span></p>
    </div>
    <div class="comments text-muted">View all 277 comments</div>
    </div>`
    postContent.prepend(resultHtml);
}

function loadName() {
    username.innerText = loginData.username;
    atName.innerText = `@${loginData.username}`;
}

window.onload = () => {
    loadName();
    displayProfilePost();

};


//sidebar
const menuItems = document.querySelector('.menu-item');
// MESSAGES
const messagesNotification = document.querySelector ('#messages-notification');
const messages = document.querySelector ('.messages');
const message = messages.querySelectorAl1('.message');
const messageSearch = document.querySelector ('#message-search');
// THEME
const theme = document .querySelector ('#theme');
const themeModal = document. querySelector('.customize-theme');
const fontSizes = document. querySelectorAlI('.choose-size span');
var root = document. querySelector(':root');
const colorPalette = document. querySelectorA11('.choose-color span');
const Bg1 = document. querySelector ('.bg-1');
const Bg2 = document .querySelector ('.bg-2');
const Bg3 = document. querySelector ('.bg-3');
//side bar

// remove active class from all menu items
const changeActiveltem = () => {
    menuItems. forEach(item => {
    item.classList.remove('active');
    })
}
    menuItems. forEach(item => {
    item.addEventListener ('click', () => {
    changeActiveltem(); 
    item.classList.add('active');
    if (item.id != 'notifications'){
    document.querySelector('.notifications-popup').style.display =
    'none';
    } else{
    document .querySelector (' notifications-popup').style.display =
    'block'
    document. querySelector( '#notifications notification-count').
    style.display =
    'none';
    }
})
    })

    ///Messages/////
//searches chat

const searchMessage = () => {
    const val = messageSearch. value. toLowerCase();
    message.forEach(user => {
    let name = user.querySelector ('h5').textContent.toLowerCase();
    if (name.indexOf(val) != -1){
    user.style.display = 'flex';
    } else { 
    user.style.display = 'none';
    }
})
}
// search chat 
messageSearch.addEventListener('keyup', searchMessage);

// highlight messages card when messages menu item is clicked
messagesNotification.addEventListener('click', () => { 
messages.style.boxShadow = '0 0 1rem var(--color-primary)';
messagesNotification.querySelector('.notification-count').style.display
= 'none';
setTimeout (() => {
messages.style. boxShadow - 'none';
}, 2000);
})

// THEME /DISPLAY CUSTOMIZATION

// opens modal
const openThemeModal = () => { 
      themeModal.style.display =
'grid';
}

// closes modal
const closeThemeModa1 = (e) => {
    if (e.target.classList.contains('customize-theme')){ 
    themeModal.style.display = 'none'
    }
}
    // close modal
    themeModal.addEventListener ('click', closeThemeModa1);
    
    theme.addEventListener ('click', openThemeModal);

    // =================fonts===================
//remove active class from spans or font size selectors
const removeSizeSelector = () => {
    fontSizes.forEach(size => {
    size.classList.remove('active');

    })
}
    fontSizes.forEach(size => { 
        
         
        size.addEventListener('click', () => {
            removeSizeSelector();
            let fontSizes;
            size.classList.toggle('active');
                
            if(size.classList.contains('font-size-1')){
                fontSizes = '10px';
                root.style.setProperty('---sticky-top-left:', '5.4rem');
                root.style.setProperty('---sticky-top-right:', '5.4rem');
                } else if(size.classList.contains('font-size-2')){
                fontSizes = '13px';
                root.style.setProperty('---sticky-top-left:', '5.4rem');
                root.style.setProperty('---sticky-top-right:', '-7rem');
                } else if(size.classList.contains('font-size-3')){
                fontSizes = '16px';
                root.style.setProperty('---sticky-top-left:', '-2rem');
                root.style.setProperty('---sticky-top-right:', '-17rem');
                } else if(size.classList.contains('font-size-4')){ 
                fontSizes = '19px';
                root.style.setProperty('---sticky-top-left:', '-5rem');
                root.style.setProperty('---sticky-top-right:', '-25rem');
                } else if(size.classList.contains ('font-size-s')){
                fontSizes =
                '22px';
                root.style.setProperty('---sticky-top-left:', '-12rem');
                root.style.setProperty('---sticky-top-right:', '-35rem');
                }
        })
        //change font size of the root html element
document. querySelector ('html') .style.fontSize = fontSizes;

    })
    //remove active class from colors 
    const changeActiveColorClass = () => {
        colorPalette.forEach (colorPicker => {
        colorPicker.classList.remove('active');
        })
    }
    // change primary colors
colorPalette.forEach(color => {
color.addEventListener ('click', () => {  
    let primaryHue;
    changeActiveColorClass();
 //remove active class from colors 

    if(color.classList.contains('color-1')){
    primaryHue = 252;
    } else if(color.classList.contains/('color-2')){
    primaryHue = 52;
     } else if(color.classList.contains/('color-3')){ 
    primaryHue = 352;
    }else if(color.classList.contains ('color-4')){
    primaryHue = 152;
    } else if(color.classList.contains ('color-5')){
    primaryHue = 202;
    }
    color.classList.add('active');
    
    root.style.setProperty('--primary-color-hue', primaryHue);
    
})
})

//theme BACKGROUND values

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//changes background color
const changeBG = () => {
root.style.setProperty('--light-color-lightness',lightColorLightness);
root.style.setProperty('--white-color-lightness', whiteColorLightness); 
root.style.setProperty('--dark-color-lightness',darkColorLightness);
}

//change background colors
Bg1.addEventListener('click', () => { 
// add active class
Bg1.classList.add('active');
// remove active class from the others
Bg2.classList.remove('active');
Bg3.classList.remove ('active');
// remove customized changes from local storage
window.location.reload();
});

Bg2.addEventListener ('click', () => {  
darkColorLightness = '95%';
whiteColorLightness ='20%';
lightColorLightness ='15%';

// add active class
Bg2.classList.add('active');
// remove active class from the others
Bg1.classList.remove('active');
Bg3.classList.remove ('active');
changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness ='0%';
   
    //add active class
    Bg3.classList.add('active');
    // remove active class from others
    Bg1.classList.remove ('active');
    Bg2.classList.remove('active');
    changeBG();
    
    })
