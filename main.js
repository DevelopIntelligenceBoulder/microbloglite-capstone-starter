let toggle = document.querySelector("#header.toggle-button");
let collapse = document.querySelectorAll("#header collapse");

toggle.addEventListener('click',function(){
collapse.forEach(col => col.classList.toggle("collapse-toggle"))
})

//mansory

new Mansory("#post.grid",{
itemSelector:'.grid-item',
gutter: 20
});

  // swiper library initialization
new Swiper('.swiper-container',{
direction:'horizontal',
loop: true,
slidesPerView: 5,
autoplay :{
delay: 3000
},
// breakpoints
breakpoints: {
     '@0':{
        slidesPerView:2
     },
     //888px
     '@1.00':{
        slidesPerView:3
     },
     //1110px
     '@1.25': {
        slidesPerView:4
     },
     //1330px
     '@1.50':{
        slidesPerView:5
     }
}
  })

  //navigation

  window.onscroll = function(){myFunction}
  //get value

  let navbar = document.getElementById("header");

 // navbar top position
 let sticky = navbar.offsetTop;

 // Position

 function myFunction(){
    if(window.pageYOffset >= sticky){
      navbar.classList.add("sticky");
    }else{
navbar.classList.remove("sticky");
    }  

    }
 

  
