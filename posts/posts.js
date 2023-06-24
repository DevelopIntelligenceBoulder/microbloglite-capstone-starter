/* Posts Page JavaScript */

"use strict";



const usersPostCard = document.getElementById("usersPostCard");

window.onload =  () =>{
    console.log("hello");

  getAllPosts();
  
}



function getAllPosts() {
    // GET /api/users
    const loginData = getLoginData();
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };
    // note: the api variable is defined in auth.js
    fetch(apiBaseURL + "/api/posts",options)
        .then(response => response.json())
        .then(posts => {
            // Do something with the users array...
            console.log(posts);
            buildUserPostsCard(posts);
        });
}

function buildUserPostsCard(posts){


    for(let post of posts){


        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        usersPostCard.appendChild(divCardBody);


        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = "Post";
        divCardBody.appendChild(cardTitle);

        
        let cardUserName= document.createElement("p");
        cardUserName.className = "card-text";
        cardUserName.innerHTML = "Author name: " + post.username;
        cardTitle.appendChild(cardUserName);


        let cardUserContent= document.createElement("p");
        cardUserContent.className = "card-text";
        cardUserContent.innerHTML = "Content: " + post.text;
        cardUserName.appendChild(cardUserContent);

        let cardUserTimeStamp= document.createElement("p");
        cardUserTimeStamp.className = "card-text";
        cardUserTimeStamp.innerHTML = "Updates: " + post.updatedAt;
        cardUserContent.appendChild(cardUserTimeStamp);

    }
   

}
// function showDetailforProductCard(product) {
    
 

 


//     let cardTitle = document.createElement("h5");
//     cardTitle.className = "card-title";
//     cardTitle.innerHTML = "Product ID: " + product.productId;
//     divCardBody.appendChild(cardTitle);

//     let cardText= document.createElement("p");
//     cardText.className = "card-text";
//     cardText.innerHTML = "Product Name: " + product.productName;
//     cardTitle.appendChild(cardText);

//     let unorderedList = document.createElement("ul");
//     unorderedList.className = "list-group list-group-flush";
//     cardText.appendChild(unorderedList);

//     let supplierInfo = document.createElement("li");
//    supplierInfo.className = "list-group-item";
//    supplierInfo.innerHTML= "Supplier: " + product.supplier;
//    unorderedList.appendChild(supplierInfo);

//     let unitsInfo = document.createElement("li");
//     unitsInfo.className = "list-group-item";
//     unitsInfo.innerHTML= "Available units: " + product.unitsInStock;
//     supplierInfo.appendChild(unitsInfo);

//     let productStatus = document.createElement("li");
//     productStatus.className = "list-group-item";
//     productStatus.innerHTML= "Discontinued: " + product.discontinued;
//     unitsInfo.appendChild( productStatus);

//     let unitPrice = document.createElement("li");
//     unitPrice.className = "list-group-item";
//     unitPrice.innerHTML= "Price: " + product.unitPrice;
//     productStatus.appendChild(unitPrice);

//     let cardBody = document.createElement("div");
//     cardBody.className = "card-body";
//     unitPrice.appendChild(cardBody);


//     let anchor = document.createElement("a");
//     anchor.className = "card-link";
//     anchor.href = "products.html";
//     anchor.text= "Back to products";
//     cardBody.appendChild(anchor);
    
// }
