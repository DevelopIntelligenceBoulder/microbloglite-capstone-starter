const NavTemplate = document.createElement('template');
NavTemplate.innerHTML = `
<div class="header">
    <slot name="logo"></slot>
    <slot name="links">
        <a href="#">Home</a>
        <a href="#">Login</a>
    </slot>
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