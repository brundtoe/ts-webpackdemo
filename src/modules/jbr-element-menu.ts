import { LitElement, html,css } from 'lit';
import {MenuItems} from './menuType'
import data from './menuitems'

class JbrElementMenu extends LitElement {

  protected items: Array<MenuItems>

  static get properties() {
    return {
      items: {type: Array}
    }
  }

  constructor () {
    super()
    this.items = data.items
  }

  static get styles () {
    return css`
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
    `
  }

  render() {
    return html`
    <nav class="flex-container">
      ${this.items.map((item) =>
        html`<a id="${item.id}" href="${item.link}">${item.text}</a>`
      )}
    </nav>
     `
  }
}

if (!customElements.get('jbr-element-menu')) {
  customElements.define('jbr-element-menu', JbrElementMenu)
}
