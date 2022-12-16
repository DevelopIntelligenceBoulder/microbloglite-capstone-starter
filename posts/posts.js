/* Posts Page JavaScript */
"use strict";
//post form
//create selectors for form
// create a selector for variable to get input
const submit = document.querySelector('#submit');
const createPost = document.querySelector('#create-post');
const feed = document.querySelector('.feed');
const feeds = document.querySelector('.feeds');
const user = document.querySelector('.user');
const atNameComponent = document.querySelector(".atName");
const usernameComponent = document.querySelector(".username");

const loginData = getLoginData();

function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}



function displayProfilePost() {
    const api = "https://microbloglite.herokuapp.com";
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

    fetch(api + "/api/users", options)
        .then((response) => response.json())
        .then((posts) => {
            loadName();
            posts.forEach((post) => {
                if (profileName == post.username) {
                    card(post, "");
                }

            });
            // messagePara.innerText = `Post created`;
        });

}

function onUpdateUserName(event) {
    event.preventDefault();

    let fullname = $('#edit_fullname').val();
    console.log(loginData.token);

    $.ajax({
        method: "PUT",
        url: `https://microbloglite.herokuapp.com/api/users/${username}`,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        data: {
            fullname: username.val
        }
    }).then((res) => {
        usernameComponent.innerText = res.fullName;
        onEditCancel();
    }).catch((err) => {
        console.log(err);
    })
}

function onEditCancel() {
    $('#edit_modal').modal('hide');
}



function onEditUserName() {
    let userName = $('.username').html();

    let contentHtml = `<form onsubmit="onUpdateUserName(event)">
    <div class="form-group">
        <label for="edit_fullname">User Name</label>
        <input type="text" class="form-control" id="edit_fullname" value="${userName}" placeholder="on your mind" required>
    </div>
    <div class="py-2 align-item-center">
        <button type="submit" class="btn btn-primary btn-sm">Confirm</button>
        <button type="button" class="btn btn-primary btn-sm " onclick="onEditCancel()">Cancel</button>
    </div>
</form>`;

    $('#edit_modal .modal-body').html(contentHtml);
    $('#edit_modal').modal('show');

}

function onDelete(data) {
    let postId = data._id;
    if (!!postId) {
        $.ajax({
            method: "DELETE",
            url: `https://microbloglite.herokuapp.com/api/posts/${postId}`,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${loginData.token}`,
            },
            data: {

            }
        }).then((res) => {
            console.log(res);
            alert('Deleted');

            // just delete item in front
            let item = $(`.feed-id-${postId}`).remove();


        }).catch((err) => {

        })

    }
}


function card(section) {
    // show 
    let postContent = $('#feeds');

    let resultHtml = `<div class="feed feed-id-${section._id ? section._id : ''}">
    <div class="head">
        <div class="user">
            <div class="profile-photo">
                <img src="./images/profile-13.jpg">
            </div> 
        <div class="ingo">
        <h3>${section.username}</h3>
        <small>${section.createdAt}</small>
        </div> 
    </div>

    <h4>${section.text} <span class="harsh-tag">#lifestyle</span></h4>
    
    <div><i onclick="myFunction(this)" class="fa fa-thumbs-up"></i></div>
    <div>
        <button type="button" class="btn btn-primary" onclick='onDelete(${JSON.stringify(section)})'>Delete</button>
    </div>
    </div>
    `
    postContent.prepend(resultHtml);
}
function displayProfilePost() {


    $.ajax({
        method: "GET",
        url: `https://microbloglite.herokuapp.com/api/posts`,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        data: {}
    }).then((posts) => {
        let username = loginData.username;

        posts.forEach((post) => {
            if (username == post.username) {
                card(post, cardSection);
            }
        });

    }).catch((err) => {
        console.log(err);
    });
}

function savePost(event) {
    event.preventDefault();
    const bodyData = {
        text: $('#create-Post').val(),
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

            card(data, "");

            $('#create-Post').val('');
            // delete 
            // displayProfilePost();
            // window.location.href = "./profile.html"
        })
        .catch((err) => {
            console.log(err);
        });
}



function loadName() {
    let uName = loginData.username;

    $.ajax({
        method: "GET",
        url: `https://microbloglite.herokuapp.com/api/users/${uName}`,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        data: {}
    }).then((res) => {
        console.log(res);

        usernameComponent.innerText = res.fullName;
        atNameComponent.innerText = `@${loginData.username}`;
    }).catch((err) => {

    });


}

window.onload = () => {
    loadName();
    displayProfilePost();

};