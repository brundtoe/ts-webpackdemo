import style from '../scss/componentStyle'

console.log('modulet cdalbum')

const template: HTMLElement = document.createElement('section')

template.innerHTML = `
  <div>
  <h2>XMLHttpRequest af CD album en xml fil</h2>
    <table id="showCd"></table>
    <div id="error"></div>
  </div>`

class CdAlbum extends HTMLElement {

    protected url: string = 'assets/data/cd_catalog.xml'

    constructor() {
        super()
        this.attachShadow({mode: 'open'})

        const stylesheet = document.createElement('style')
        stylesheet.append(style)
        //@ts-ignore
        this.shadowRoot.appendChild(stylesheet.cloneNode(true))

        //@ts-ignore
        this.shadowRoot.appendChild(template.cloneNode(true))

    }
    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        //@ts-ignore
        const showCd = <HTMLElement>this.shadowRoot.querySelector('#showCd')
        //@ts-ignore
        const errorElement = <HTMLElement>this.shadowRoot.querySelector('#error')
        console.log('cdButton eventlistener')
        let url = <string>this.url;

        let xmlhttp: XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                buildTable(xmlhttp, showCd, errorElement);
            } else if (this.readyState === 4 && this.status !== 200) {
                errorElement.innerHTML = xmlhttp.statusText
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function buildTable(xmlhttp: XMLHttpRequest, showCd: HTMLElement, errorElement: HTMLElement) {
            let xmlDoc = xmlhttp.responseXML;
            if (!xmlDoc) {
                errorElement.innerHTML = 'xml filen er ikke indlæst'
                return
            }
            let nodes: HTMLCollection = xmlDoc.getElementsByTagName("CD");
            if (!nodes) {
                errorElement.innerHTML = 'elementet CD er ikkee fundet i cd album'
                return
            }
            let numNodes: number = (nodes.length > 10) ? 10 : nodes.length
            let table = "<thead><tr><th>Artist</th><th>Title</th></tr></thead>";
            for (let i = 0; i < numNodes; i++) {
                table += `<tr id="cd-${i}" ><td >`
                table += nodes[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
                table += "</td><td>";
                table += nodes[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
                table += "</td></tr>";
            }
            showCd.innerHTML = table
            return
        }
    }
}

if (!window.customElements.get('cd-album')) {
    window.customElements.define('cd-album', CdAlbum)
}
