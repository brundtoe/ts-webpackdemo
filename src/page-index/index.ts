import docElement from '../modules/renderElement'

import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

document.addEventListener('DOMContentLoaded', (e) => {
  docElement.renderHtml('data','<strong>Hello Webpack from TypeScript</strong>')
  console.log('DOMContentLoaded', 'page-index')
  $('#alert').on('click', () => {
    alert('jQuery works!')
  })
})
