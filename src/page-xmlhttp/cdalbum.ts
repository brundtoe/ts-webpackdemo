import docElement from '../modules/renderElement'

console.log('modulet cdalbum')

export function addCdAlbums() {

    const cdButton = document.getElementById('cdButton')
    if (!cdButton) {
        docElement.renderHtml('error', 'cdButton mangler på siden')
        return
    }
    cdButton.addEventListener('click', function (e) {
        console.log('cdButton eventlistener')

        e.preventDefault();
        let url: string | undefined = this.dataset.url;
        if (!url) {
            docElement.renderHtml('error', 'Der mangler en url i requesten')
            return
        }

        let xmlhttp: XMLHttpRequest = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                buildTable(this);
            } else if (this.readyState === 4 && this.status !== 200) {
                docElement.renderHtml('error',xmlhttp.statusText)
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    })

    function buildTable(xmlhttp: XMLHttpRequest) {
        let xmlDoc = xmlhttp.responseXML;
        if (!xmlDoc) {
            docElement.renderHtml('error','xml filen er ikke indlæst')
            return
        }
        let nodes: HTMLCollection = xmlDoc.getElementsByTagName("CD");
        if (!nodes) {
            docElement.renderHtml('error','elementet CD er ikkee fundet i cd album')
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
        docElement.renderHtml('resultTable',table)
        return
    }
}
