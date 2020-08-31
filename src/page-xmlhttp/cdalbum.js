console.log('modulet cdalbum')

let x = null;  //modulets globale variabel, som indeholder den indlæste xml fil

document.getElementById('cdButton').addEventListener('click', function (e) {
  console.log('cdButton eventlistener')

  e.preventDefault();
  let url = this.dataset.url;

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      buildTable(this);
    } else if (this.readyState === 4 && this.status !== 200) {
      showError(xmlhttp);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function buildTable(xmlhttp) {
    let xmlDoc = xmlhttp.responseXML;
    x = xmlDoc.getElementsByTagName("CD");
    let table = "<tr><th>Artist</th><th>Title</th></tr>";
    for (let i = 0; i < x.length; i++) {
      table += `<tr id="cd-${i}" ><td >`
      table += x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
      table += "</td><td>";
      table += x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
      table += "</td></tr>";
    }
    document.getElementById("resultTable").innerHTML = table;

    function showError (xmlhttp) {
      document.getElementById("error").innerHTML = 'Error: ' + xmlhttp.statusText;
    }
  }
})

document.getElementById('resultTable').addEventListener('click', e => {
  const id = e.target.parentElement.getAttribute('id').split('-')
  const i = parseInt(id[1])
  document.getElementById("showCd").innerHTML =
    "Artist: " +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "<br>Title: " +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "<br>Year: " +
    x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
})
