
const style = `.flex-container {
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
      }`

const template: HTMLElement = document.createElement('section')

template.innerHTML = `
  <nav  class="flex-container">
    <a data-test="menuJackie" href="#"><strong>Jackie Menu</strong></a>
    <a data-test="home" href="/index.html">Home</a>
    <a data-test="authors" href="/authors.html">Authors</a>
    <a data-test="bookstore" href="/bookstore.html">Customers</a>
    <a data-test="geoloc" href="/geoloc.html">Geoloc</a>
  </nav>`

class JbrMenu extends HTMLElement{

  constructor() {
    super()
    this.attachShadow({mode:'open'})

    const stylesheet = document.createElement('style')
    stylesheet.append(style)
    //@ts-ignore
    this.shadowRoot.appendChild(stylesheet.cloneNode(true))
    //@ts-ignore
    this.shadowRoot.appendChild(template.cloneNode(true))
  }
}
if (!customElements.get('jbr-menu')) {
  customElements.define('jbr-menu', JbrMenu)
}
