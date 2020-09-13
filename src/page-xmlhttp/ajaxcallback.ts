import style from './componentStyle'

console.log('modulet ajaxcallback')

const template: HTMLTemplateElement = document.createElement('template')

template.innerHTML = `${style}
    <div>
        <button type="button" class="btn btn-primary btn-sm" id="myButton" data-url="assets/data/ajax_info.html">XMLHttpRequest</button>
        <table id="resultTable"></table>
        <div id="error"></div>
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
            let url = <string>this.getAttribute('data-url');
            let xhr: XMLHttpRequest;
            xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    callback(xhr, resultTable);
                } else {
                    myError(xhr, errorElement);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        })

        function callback(xhr: XMLHttpRequest, resultTable: HTMLElement) {
            resultTable.innerHTML = xhr.responseText
        }

        function myError(xhr: XMLHttpRequest, errorElement: HTMLElement ) {
            errorElement.innerHTML = xhr.statusText
        }
    }
}

if (!customElements.get('ajax-callback')){
    window.customElements.define('ajax-callback',AjaxCallback)
}
