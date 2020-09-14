import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

//import docElement from "../modules/renderElement";
import './ajaxcallback'
import './cdalbum'
import './ajax-component'

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded', 'page-xmlhttp')
    /**
     const cmdButton = <HTMLButtonElement>document.querySelector('#cmdButton')
     cmdButton.addEventListener('click', (e: Event) => {
        e.preventDefault()
        const container = <HTMLElement>document.querySelector('#ajaxSection')
        const component = document.querySelector('ajax-callback')
        if (component) {
            container.removeChild(component)
        } else {
            const ajaxComponent = document.createElement('ajax-callback')
            container.appendChild(ajaxComponent)
        }

    })
     */

    const formular = <HTMLFormElement>document.querySelector('#queries')

    formular.addEventListener('submit', (e) => {

        e.preventDefault()

        let formular = e.target
        //@ts-ignore
        let formData = new FormData(formular)
        console.log(formData.get('action' +
            ''))
    })
})
