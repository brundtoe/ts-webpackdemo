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

class JackieMenu extends HTMLElement{

  constructor() {
    super()
    const template = document.getElementById('menu-items')
    //@ts-ignore
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
if (!customElements.get('jackie-menu')) {
  customElements.define('jackie-menu', JackieMenu)
}
