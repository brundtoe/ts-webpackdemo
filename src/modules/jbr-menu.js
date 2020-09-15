import { html, render } from 'lit-html'
import data from './menuitems'

const template = document.createElement('template')

const content = (data) => html`
 <style>
  
      .flex-container {
          display: flex;
          flex-direction: row;
          height: 3.0em;
          align-items: center;
          align-content: space-around;
          background-color: #f8f8f8;
      }
      .flex-container > a {
          margin-left: 1rem;
          font-size: 1rem;
          text-align: center;
          text-decoration: none;
          color: #797979;
          background-color: #f8f8f8;
      }
      a:hover, a:active, a:focus {
          color: #282828;
      }
  </style>

<nav class="flex-container">
  ${data.items.map((item) =>
  html`<a id="${item.id}" href="${item.link}">${item.text}</a>`
)}
</nav>`

class JbrMenu extends HTMLElement{

  constructor() {
    super()
    this.attachShadow({mode:'open'})
    this.shadowRoot.appendChild(template.cloneNode(true))
    render(content(data), this.shadowRoot)
  }
}
if (!customElements.get('jbr-menu')) {
  customElements.define('jbr-menu', JbrMenu)
}
