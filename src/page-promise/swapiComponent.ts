import style from '../scss/componentStyle'
import {SwapiTypes} from "./swapiTypes";
import handleResponse from "./handleResponsedata"
import handleError from "./handleResponseError"

const template: HTMLElement = document.createElement('section')

template.innerHTML = `
<div>
  <h2>Promise henter Star Wars People</h2>
  <div id="error"></div>
  <div class="rounded">
      <table id="resultTable" class="table table-sm table-striped"></table>
  </div>
</div>`

class SwapiComponent extends HTMLElement {

    protected url: string
    protected domElement: HTMLElement
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        const stylesheet = document.createElement('style')
        stylesheet.append(style)
        //@ts-ignore
        this.shadowRoot.appendChild(stylesheet.cloneNode(true))
        //@ts-ignore
        this.shadowRoot.appendChild(template.cloneNode(true))
        this.url = "https://swapi.dev/api/people/9"
        //@ts-ignore
        this.domElement = this.shadowRoot.getElementById('resultTable')
    }

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        //@ts-ignore
        window.fetch(this.url, {
            method: 'GET',
            cache: 'no-cache'
        })
            .then(res => {
                const data: Promise<SwapiTypes> = res.json()
                if (res.ok) {
                    return data
                } else {
                    throw new Error(`Data er ikke indlæst fra ${this.url}`)
                }
            })
            .then(data => {
                console.log(data)
                this.domElement.innerHTML = handleResponse(data)
            })
            .catch(error => {
                this.domElement.innerHTML = handleError(error)
            })
    }
}
if (!window.customElements.get('swapi-component')) {
    window.customElements.define('swapi-component',SwapiComponent)
}
