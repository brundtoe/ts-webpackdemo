import docElement from '../modules/renderElement'

console.log('modulet cdalbum')

let x: HTMLCollection | null = null;  //modulets globale variabel, som indeholder den indlæste xml fil

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
                showError(xmlhttp);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    })

    const resultTable = document.getElementById('resultTable')
    if (!resultTable) {
        docElement.renderHtml('error', 'Resultattabellen mangler på siden')
        return
    }
    resultTable.addEventListener('click', function(e: MouseEvent) {
        //@ts-ignore
        const id = e.target.parentElement.getAttribute('id').split('-')
        if (!id) {
            docElement.renderHtml('error', 'Der mangler elementet med id-')
            return
        }
        const i = parseInt(id[1])
        if (!x) {
            docElement.renderHtml('error','cd album er ikke indlæst')
            return
        }
        const resultat = "Artist: " +
            x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
            "<br>Title: " +
            x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
            "<br>Year: " +
            x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
        docElement.renderHtml('showCd', resultat)
    })

    function buildTable(xmlhttp: XMLHttpRequest) {
        let xmlDoc = xmlhttp.responseXML;
        if (!xmlDoc) {
            docElement.renderHtml('error','xml filen er ikke indlæst')
            return
        }
        x = xmlDoc.getElementsByTagName("CD");
        if (!x) {
            docElement.renderHtml('error','elementet CD er ikkee fundet i cd album')
            return
        }
        let table = "<tr><th>Artist</th><th>Title</th></tr>";
        for (let i = 0; i < x.length; i++) {
            table += `<tr id="cd-${i}" ><td >`
            table += x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
            table += "</td><td>";
            table += x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
            table += "</td></tr>";
        }
        docElement.renderHtml('resultTable',table)
        return
    }

    function showError(xmlhttp:XMLHttpRequest) {
        docElement.renderHtml('error',xmlhttp.statusText)
    }
}
