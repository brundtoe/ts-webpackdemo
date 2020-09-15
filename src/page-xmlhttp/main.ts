import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import docElement from "../modules/renderElement";

import '../modules/jbr-menu'
import './ajaxcallback'
import './cdalbum'
import './fetch-component'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded', 'page-xmlhttp')
    hideAll()

    submitFormular()

})

let submitFormular = () => {

    const formular = <HTMLFormElement>document.querySelector('#queries')
    formular.addEventListener('submit', (e) => {

        e.preventDefault()
        hideAll()

        let formular = e.target
        //@ts-ignore
        let formData = new FormData(formular)
        let action = <string>formData.get('action')

        const container = <HTMLElement>document.querySelector('#container')
        const component = document.createElement(action)
        container.appendChild(component)
    })
}


let hideAll = () => {
    docElement.renderHtml('error','')
    const container = <HTMLElement>document.querySelector('#container')
    container.innerHTML = ''
}
