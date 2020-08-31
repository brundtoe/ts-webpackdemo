import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import swapi from "./fetchFile"
import handleResponse from "./handleResponsedata"
import handleError from "./handleResponseError"

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-promise')
})

document.getElementById('swapiButton').addEventListener('click', function (e) {
  console.log('swapiButton eventlistener')

  e.preventDefault()
  const url = e.target.dataset.url

  swapi(url, 'resultTable', handleResponse, handleError)
})
