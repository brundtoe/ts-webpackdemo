import docClass from '../modules/renderElement'

document.addEventListener('DOMContentLoaded', () => {
  docClass.render('data','<strong>Hello Webpack</strong>')
  console.log('DOMContentLoaded', 'page-index')
})
