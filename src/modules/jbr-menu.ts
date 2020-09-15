
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

const template: HTMLTemplateElement = document.createElement('template')

template.innerHTML = `
  <nav  class="flex-container">
    <a href="#"><strong>Jackie Menu</strong></a>
    <a href="/index.html">Home</a>
    <a href="/authors.html">Authors</a>
    <a href="/bookstore.html">Customers</a>
    <a href="/geoloc.html">Geoloc</a>
  </nav>`

class JbrMenu extends HTMLElement{

  constructor() {
    super()

    const templateContent = template.content

    const stylesheet = document.createElement('style')
    stylesheet.append(style)

    this.attachShadow({mode:'open'})
    //@ts-ignore
    this.shadowRoot.appendChild(stylesheet.cloneNode(true))
    //@ts-ignore
    this.shadowRoot.appendChild(templateContent.cloneNode(true))
  }
}
if (!customElements.get('jbr-menu')) {
  customElements.define('jbr-menu', JbrMenu)
}
