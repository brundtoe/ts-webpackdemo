import style from '../scss/componentStyle'

console.log('modulet ajaxcallback')

const template: HTMLElement = document.createElement('section')

template.innerHTML = `
  <div>
    <h2>XMLHttp request med callback</h2>
    <table id="resultTable"></table>
    <div id="error"></div>
  </div>`

class AjaxCallback extends HTMLElement {

    protected url: string = "assets/data/ajax_info.html"

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        const stylesheet = document.createElement('style')
        stylesheet.append(style)
        //@ts-ignore
        this.shadowRoot.appendChild(stylesheet.cloneNode(true))

        //@ts-ignore
        this.shadowRoot.appendChild(template.cloneNode(true))
        //@ts-ignore

    }
    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        //@ts-ignore
        const resultTable = <HTMLElement>this.shadowRoot.querySelector('#resultTable')
        //@ts-ignore
        const errorElement = <HTMLElement>this.shadowRoot.querySelector('#error')
            console.log('ajax callback eventlistener')
            let url = this.url
            let xhr: XMLHttpRequest
            xhr = new XMLHttpRequest()
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resultTable.innerHTML = xhr.responseText
                } else {
                    errorElement.innerHTML = xhr.statusText
                }
            }
            xhr.open("GET", url, true)
            xhr.send()
        }

    // noinspection JSUnusedGlobalSymbols
    disconnectedCallback() {
        console.log('ajax-callback er fjernet')
    }
}

if (!customElements.get('ajax-callback')){
    window.customElements.define('ajax-callback',AjaxCallback)
}
