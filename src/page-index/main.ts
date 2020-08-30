import docElement from '../modules/renderElement'

document.addEventListener('DOMContentLoaded', () => {
  docElement.render('data','<strong>Hello Webpack</strong>')
  console.log('DOMContentLoaded', 'page-index')
})
