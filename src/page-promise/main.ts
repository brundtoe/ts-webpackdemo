import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import swapi from "./fetchFile"
import handleResponse from "./handleResponsedata"
import handleError from "./handleResponseError"

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-promise')
})

const swapiButton = <HTMLElement>document.getElementById('swapiButton')

swapiButton.addEventListener('click', function (e: MouseEvent) {
  console.log('swapiButton eventlistener')

  e.preventDefault()

  //@ts-ignore
  const url: string = e.target.dataset.url
  swapi(url, 'resultTable', handleResponse, handleError)
})
