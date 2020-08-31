import 'bootstrap'
import '../scss/index.scss'
import './page.scss'


const axios = require('axios')

import {LitElement, html, css} from 'lit-element'
import pattern from './moduler/pattern.js'

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-xmldemo')
})

class AuthorsXmldemo extends LitElement {
  static get properties(){
    return {
      pattern: {type: pattern},
      result:{type: Node}

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
    this.pattern = new pattern('Hilite-xml.xsl','Authors.xml',null)
    //this.result = ""
    const axiosInstance = axios.create({
      method: 'get',
      baseURL: '/assets/data',
      responseType: 'text'
    })

    const result = this.pattern.fetchFiles(axiosInstance)

    result.then(res => {
      // console.log(res)
      this.pattern.convertXml(res.xmlText.data, res.xslText.data)
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

  performQuery(event) {
    try {
      let theQuery = event.target.textContent
      this.result = this.pattern.execQuery(theQuery)
    } catch (error) {
      this.result = `<strong>${error.message}</strong>`
    }
  }

}

window.customElements.define('authors-xmldemo',AuthorsXmldemo);
