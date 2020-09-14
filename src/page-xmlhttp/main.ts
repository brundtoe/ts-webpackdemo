import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import docElement from "../modules/renderElement";
import './ajaxcallback'
import './cdalbum'
import './fetch-component'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded', 'page-xmlhttp')
    hideAll()

    const formular = <HTMLFormElement>document.querySelector('#queries')

    formular.addEventListener('submit', (e) => {

        e.preventDefault()
        hideAll()
        let formular = e.target
        //@ts-ignore
        let formData = new FormData(formular)
        let action = formData.get('action')

        switch (action) {
            case 'fetch':
                fetchQuery()
                break
            case 'callback':
                callbackQuery()
                break
            case 'cdalbum':
                cdalbumQuery()
                break
            default:
                docElement.renderHtml('error', 'Den valgt query kan ikke behandles')
        }
    })
})

let fetchQuery = () => {
    const container = <HTMLElement>document.querySelector('#container')
    const component = document.createElement('fetch-component')
    container.appendChild(component)
}

let callbackQuery = () => {
    const container = <HTMLElement>document.querySelector('#container')
    const component = document.createElement('ajax-callback')
    container.appendChild(component)
}

let cdalbumQuery = () => {
    const container = <HTMLElement>document.querySelector('#container')
    const component = document.createElement('cd-album')
    container.appendChild(component)
}

let hideAll = () => {
    docElement.renderHtml('error','')
    const container = <HTMLElement>document.querySelector('#container')
    container.innerHTML = ''
}
