import docElement from '../modules/renderElement'

import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

document.addEventListener('DOMContentLoaded', (e) => {
  docElement.render('data','<strong>Hello Webpack from another page</strong>')
  console.log('DOMContentLoaded', 'page-another')
  $('#alert').on('click', () => {
    alert('jQuery works again!')
  })
})
