import 'bootstrap'
import '../scss/index.css'
import './page.css'

import {LitElement, html, css, TemplateResult} from 'lit'
import Pattern from './moduler/pattern'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded', 'page-xmldemo')
})

class AuthorsXmldemo extends LitElement {

    protected pattern: Pattern
    //@ts-ignore
    protected result: DocumentFragment | TemplateResult | undefined

    static get properties() {
        return {
            pattern: {attribute: false},
            result: {attribute: false}
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

    }

    render() {
        return html`
          <p>Queries foretages med XPATH</p>
          <!--suppress HtmlUnknownTag -->
          <slot name="queries" @click="${this.performQuery}"></slot>
          <div>${this.result}</div>
        `
    }

    async performQuery(event: { target: HTMLElement }) {
        try {
            // @ts-ignore
            if (this.pattern.xmlDom.childElementCount == 0) {
                const {xmlText, xslText} = await this.pattern.fetchFiles()
                this.pattern.convertXml(xmlText, xslText)
            }
            let theQuery: string | null = event.target.textContent
            if (!theQuery) {
                return
            }
            this.result = this.pattern.execQuery(theQuery)

        } catch (error: unknown) {
            // @ts-ignore
            this.result = html`<strong>${error.message}</strong>`
        }
    }

}

window.customElements.define('authors-xmldemo', AuthorsXmldemo);
