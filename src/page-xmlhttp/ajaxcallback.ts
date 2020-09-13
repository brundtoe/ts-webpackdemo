import docElement from '../modules/renderElement'

console.log('modulet ajaxcallback')

const template: HTMLTemplateElement = document.createElement('template')

template.innerHTML = `<div >
    <div id="content" class="container">
      <div class="col-sm8">
        <button type="button" class="btn btn-primary btn-sm" id="myButton" data-url="assets/data/ajax_info.html">XMLHttpRequest</button>
        <div id="error"></div>
        <table id="resultTable"></table>
      </div>
    </div>
  </div>`

class AjaxCallback extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        //@ts-ignore
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        //@ts-ignore
        const myButton = <HTMLButtonElement>this.shadowRoot.querySelector('#myButton')
        //@ts-ignore
        const resultTable = <HTMLElement>this.shadowRoot.querySelector('#resultTable')
        //@ts-ignore
        const errorElement = <HTMLElement>this.shadowRoot.querySelector('#error')

        myButton.addEventListener('click', function (e) {
            console.log('ajax callback eventlistener')
            e.preventDefault();
            console.log('Der er trykket på fetch Content ')
            let url: string | null = this.getAttribute('data-url');
            if (!url) {
                docElement.renderHtml('error', 'atributten data-url mangler på myButton')
                return
            }
            let xhr: XMLHttpRequest;
            xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    callback(xhr);
                } else {
                    myError(xhr);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        })

        function callback(xhr: XMLHttpRequest) {
            resultTable.innerHTML = xhr.responseText
            //docElement.renderHtml('resultTable', xhr.responseText)
        }

        function myError(xhr: XMLHttpRequest) {
            errorElement.innerHTML = xhr.statusText
            //docElement.renderHtml('error', xhr.statusText)
        }
    }
}

if (!customElements.get('ajax-callback')){
    window.customElements.define('ajax-callback',AjaxCallback)
}
