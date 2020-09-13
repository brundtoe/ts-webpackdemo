import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import docElement from "../modules/renderElement";
import './ajaxcallback'
import  './cdalbum'
import './ajax-component'

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-xmlhttp')

})

const components: Array<string> = []

components.forEach(component => {
  const widget = (document.getElementById(`${component}Widget`)) as HTMLElement
  widget.addEventListener('click', e => {
    e.preventDefault()
    docElement.renderHtml('resultTable','')
    docElement.renderHtml('error','')
    components.forEach(section => {
      if (section !== component) {
        const sectionElement = <HTMLElement>document.getElementById(`${section}Section`)
        sectionElement.style.display = 'none'
        sectionElement.setAttribute('class','hide')
      } else {
        const componentSection = <HTMLElement>document.getElementById(`${component}Section`)
        componentSection.style.display = 'block'
        componentSection.setAttribute('class','show')
      }
    })
  })
})


