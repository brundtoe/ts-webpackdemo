import docElement from '../modules/renderElement'
console.log('modulet ajaxcallback')
export function addAjaxCallback() {

  const myButton = document.getElementById('myButton')
  if (!myButton) {
    docElement.renderHtml('result', 'myButton findes ikke på websiden')
    return
  }
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
        callback(this);
      } else {
        myError(xhr);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  })

  function callback(xhr: XMLHttpRequest) {
    docElement.renderHtml('resultTable', xhr.responseText)
  }

  function myError(xhr: XMLHttpRequest) {
    docElement.renderHtml('error', xhr.statusText)
  }
}
