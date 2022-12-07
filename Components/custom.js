// This file contains the custom elements for the website
const NavTemplate = document.createElement('template');
NavTemplate.innerHTML = `
<div class="header">
    <div class="header__logo">
        <a href="index.html">
            <img src="images/logo.png" alt="logo">
        </a>
    </div>
    <div class="header__menu">
        <div class="header__menu__search">
            <input type="text" placeholder="Search">
            <i class="fas fa-search"></i>
        </div>
        <ul class="header__menu__nav">
            <li class="header__menu__nav__item">
                <a href="index.html">Explore</a>
            </li>
            <li class="header__menu__nav__item">
                <a href="posts.html">Post</a>
            </li>
            <li class="header__menu__nav__item">
                <a href="profile.html">Profile</a>
            </li>
        </ul>
</div>
    <style>
        .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
        }
        .header__logo {
            float: left;
            width: 20%;
        }
        .header__logo img {
            width: 100%;
        }
        .header__menu {
            float: right;
            width: 80%;
        }
        .header__menu__search {
            float: left;
            width: 30%;
            position: relative;
        }
        .header__menu__search input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            outline: none;
        }
        .header__menu__search i {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            color: #fff;
        }
        .header__menu__nav {
            float: right;
            width: 70%;
        }
        .header__menu__nav__item {
            display: inline-block;
            margin-left: 10px;
        }
        .header__menu__nav__item a {
            color: #fff;
            text-decoration: none;
        }
    </style>
`;

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(NavTemplate.content.cloneNode(true));
    }
}

window.customElements.define('nav-bar', NavBar);