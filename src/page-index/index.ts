import docElement from '../modules/renderElement'

import 'bootstrap'
import '../scss/index.css'
import './page.css'

document.addEventListener('DOMContentLoaded', () => {
  docElement.renderHtml('data','<strong>Hello Webpack from TypeScript</strong>')
  console.log('DOMContentLoaded', 'page-index')
})
