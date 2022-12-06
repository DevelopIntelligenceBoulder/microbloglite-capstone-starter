import globalTheme from './globalTheme'

let theme = globalTheme.getTheme(color)

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
                <a href="index.html">Home</a>
            </li>
            <li class="header__menu__nav__item">
                <a href="post.html">Post</a>
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
        .header a {
            color: #fff;
            text-decoration: none;
            padding: 10px;
        }
    </style>
`;

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <slot></slot>
        `;
    }
}