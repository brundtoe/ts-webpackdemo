import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

require('./ajaxcallback')
require('./cdalbum')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-xmlhttp')

})
const components = ['ajax', 'cd']

components.forEach(component => {
  document.getElementById(`${component}Widget`).addEventListener('click', e => {
    e.preventDefault()
    document.getElementById('resultTable').innerHTML = ""
    document.getElementById('showCd').innerHTML = ""
    document.getElementById('error').innerHTML = ""
    components.forEach(section => {
      if (section !== component) {
        document.getElementById(`${section}Section`).style.display = 'none'
        document.getElementById(`${section}Section`).setAttribute('class','hide')
      } else {
        document.getElementById(`${component}Section`).style.display = 'block'
        document.getElementById(`${component}Section`).setAttribute('class','show')
      }
    })
  })
})


