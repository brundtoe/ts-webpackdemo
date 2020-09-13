import {LitElement, html, css} from 'lit-element'

class AjaxComponent extends LitElement {

    protected url: string
    protected result: string

    constructor() {
        super();
        this.url = "assets/data/ajax_info.html"
        this.result = ""
    }

    static get properties () {
        return {
            url: {type: String},
            result: {type: String}
        }
    }

    render() {

        return html`
        <div >
          <button type="button" class="btn btn-primary btn-sm"
           id="myButton" @click="${this.fetchHtml}" data-url=${this.url}>
           Fetch HTML fragment</button>
          <p>&nbsp;</p>
          <table>${this.result}</table>
        </div>
        `
    }

    async fetchHtml(event: Event) {

        event.preventDefault()
        //@ts-ignore
        this.result = await window.fetch(this.url).then(res => res.text())
        console.log('resultat',this.result)
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

if (!customElements.get('ajax-compoent')) {
    customElements.define('ajax-component', AjaxComponent)
}
