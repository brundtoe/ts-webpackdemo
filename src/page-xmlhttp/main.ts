import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

//import docElement from "../modules/renderElement";
import './ajaxcallback'
import  './cdalbum'
import './ajax-component'

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-xmlhttp')

const cmdButton = <HTMLButtonElement>document.querySelector('#alert')
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

})


