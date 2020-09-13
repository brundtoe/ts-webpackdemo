import style from './componentStyle'
console.log('modulet cdalbum')

const template: HTMLTemplateElement = document.createElement('template')

template.innerHTML = `${style}
  <div>
    <button type="button" class="btn btn-primary btn-sm" id="cdButton" 
          data-url="assets/data/cd_catalog.xml">Read CD catalog</button>
    <p>&nbsp;</p>
    <table id="showCd"></table>
    <div id="error"></div>
  </div>`

class CdAlbum extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        //@ts-ignore
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        //@ts-ignore
        const cdButton = <HTMLButtonElement>this.shadowRoot.querySelector('#cdButton')
        //@ts-ignore
        const showCd = <HTMLElement>this.shadowRoot.querySelector('#showCd')
        //@ts-ignore
        const errorElement = <HTMLElement>this.shadowRoot.querySelector('#error')

        cdButton.addEventListener('click', function (e) {
            console.log('cdButton eventlistener')

            e.preventDefault();
            let url = <string>this.dataset.url;

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
        })

        function buildTable(xmlhttp: XMLHttpRequest, showCd: HTMLElement, errorElement: HTMLElement) {
            let xmlDoc = xmlhttp.responseXML;
            if (!xmlDoc) {
                errorElement.innerHTML= 'xml filen er ikke indlæst'
                return
            }
            let nodes: HTMLCollection = xmlDoc.getElementsByTagName("CD");
            if (!nodes) {
                errorElement.innerHTML = 'elementet CD er ikkee fundet i cd album'
                return
            }
            let numNodes: number = nodes.length
            let table = "<tr><th>Artist</th><th>Title</th></tr>";
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
