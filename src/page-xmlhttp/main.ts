import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import docElement from "../modules/renderElement";
import {addAjaxCallback } from './ajaxcallback'
import {addCdAlbums} from './cdalbum'

addAjaxCallback()
addCdAlbums()

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-xmlhttp')

})

const components = ['ajax', 'cd']

components.forEach(component => {
  const widget = (document.getElementById(`${component}Widget`)) as HTMLElement
  widget.addEventListener('click', e => {
    e.preventDefault()
    docElement.renderHtml('resultTable','')
    docElement.renderHtml('showCd','')
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


