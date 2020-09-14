import {LitElement, html, css} from 'lit-element'

class FetchComponent extends LitElement {

    protected url: string
    protected result: Array<string>
    protected showTable: boolean
    protected error: string

    constructor() {
        super();
        this.url = "assets/data/ajax_info.json"
        this.error = ''
        this.result = []
        this.showTable = false
    }

    static get properties() {
        return {
            url: {type: String},
            result: {type: Array},
            show: {type: Boolean}
        }
    }

    render() {
        return html`
        <div >
        <h2>Window.fetch JSON file</h2>
          <table class="${this.showTable ? 'show' : 'hide'}">
          <tr class="row"><th>Ajax Statements</th></tr>
            ${this.result.map(res => html`<tr class="row">
                <td>${res}</td></tr>`)}
          </table>
          <div id="error"></div>
        </div>`
    }

    connectedCallback() {
        super.connectedCallback();
        window.fetch(this.url).then(res => res.json()).then(data => {
            this.result = data
            this.showTable = true
        }).catch( err => this.error = err.message)
    }

    async fetchHtml(event: Event) {

        event.preventDefault()


    }

    static get styles() {
        return css`
    :host {
      display: block;
      margin: auto;
      border: 1px solid #d5d5d5;
      align-items: center;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      font-family: sans-serif;
    }
    table {
      margin: auto;
    }
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    th, td {
      padding: 5px;
    }
    .row:first-child {
      background: #FF0
    }
    .row:nth-child(2n) {
      background-color: #FFF;
    }
    .row:nth-child(2n+3) {
      background: #d5d5d5
    }
    .hide {
      visibility: hidden;
    }
    .show {
      visibility: visible;
      }
    `
    }

}

if (!customElements.get('fetch-component')) {
    customElements.define('fetch-component', FetchComponent)
}
