console.log('modulet ajaxcallback')
document.getElementById('myButton').addEventListener('click', function (e) {
  console.log('ajax callback eventlistener')
  e.preventDefault();
  console.log('Der er trykket på fetch Content ')
  let url = this.getAttribute('data-url');

  let xhr;
  xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 300) {
      callback(this);
    }
    else {
      myError(xhr);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
})
function callback(xhr) {
  document.getElementById("resultTable").innerHTML = xhr.responseText;

}
function myError(xhr){
  document.getElementById("result").innerHTML = 'Content: ' + xhr.statusText;
}
