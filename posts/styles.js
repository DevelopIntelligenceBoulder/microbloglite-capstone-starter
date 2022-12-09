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
