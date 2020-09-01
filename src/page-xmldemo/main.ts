import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import {LitElement, html, css, TemplateResult} from 'lit-element'
import Pattern from './moduler/pattern'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded', 'page-xmldemo')
})

class AuthorsXmldemo extends LitElement {

    protected pattern: Pattern
    //@ts-ignore
    protected result: DocumentFragment | TemplateResult

    static get properties() {
        return {
            pattern: {type: Pattern},
            result: {type: Node}

        }
    }

    static get styles() {
        return css`
    :host {
      display: block;
      margin: auto;
      background-color: #d4d4d4;
      border: 1px solid #d5d5d5;
      align-items: center;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      font-family: sans-serif;
    }
   `
    }

    constructor() {
        super()
        const baseUrl = '/assets/data'
        this.pattern = new Pattern(`${baseUrl}/Hilite-xml.xsl`, `${baseUrl}/Authors.xml`)

        const result = this.pattern.fetchFiles()

        result.then(res => {
            //@ts-ignore
            const {xmlText, xslText} = res
            this.pattern.convertXml(xmlText, xslText)
            this.result = html`<h3>Filerne er indlæst</h3>`
        })

    }

    render() {
        return html`
    <p>Queries foretages med XPATH</p>
    <slot name="queries" @click="${this.performQuery}"></slot>
    <div>${this.result}</div>
    `
    }

    performQuery(event: Event) {
        try {
            //@ts-ignore
            let theQuery = event.target.textContent
            this.result = this.pattern.execQuery(theQuery)
        } catch (error) {
            this.result = html `<strong>${error.message}</strong>`
        }
    }

}

window.customElements.define('authors-xmldemo', AuthorsXmldemo);
