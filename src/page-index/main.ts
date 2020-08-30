import docElement from '../modules/renderElement'

import 'normalize.css'
import '../css/main.css'
import './page.css'
import '../css/styles.scss'

document.addEventListener('DOMContentLoaded', () => {
  docElement.render('data','<strong>Hello Webpack from TypeScript</strong>')
  console.log('DOMContentLoaded', 'page-index')
})
