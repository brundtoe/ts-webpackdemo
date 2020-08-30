import docElement from '../modules/renderElement'

require('../css/main.css')
require('./page.css')

document.addEventListener('DOMContentLoaded', () => {
  docElement.render('data','<strong>Hello Webpack from TypeScript</strong>')
  console.log('DOMContentLoaded', 'page-index')
})
