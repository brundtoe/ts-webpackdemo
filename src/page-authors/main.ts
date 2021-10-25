import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import { bookstore } from '../assets/data/bookstore'
import '../modules/jbr-element-menu'

interface Author {
  id: number,
  firstname: string,
  lastname: string,
  mail: string
}

class BookstoreAuthors extends HTMLElement {

  constructor () {
    super()
  }

  // noinspection JSUnusedGlobalSymbols
  connectedCallback () {
    const template = document.getElementById('layout')
    //@ts-ignore
    const clone = template.content.cloneNode(true)
    this.appendChild(clone)
    const buttonAuthor = this.querySelector('#readAuthors')
    //@ts-ignore
    buttonAuthor.addEventListener('click', () => {
      // console.log('buttonCustomer',buttonCustomer)
      this.handleResponse(bookstore.authors.filter(author => author.id <= 12))
    })

    const firstnames = Array.from(this.querySelectorAll('li'))
    firstnames.forEach(firstname => {
      this.handleClick(firstname, this.handleResponse)
    })
  }

  handleClick (firstname:HTMLLIElement, response: Function) {
    firstname.addEventListener('click', function () {
      console.log(firstname.textContent)
      const selection = bookstore.authors.filter(author => author.firstname.match(firstname.innerText))
      console.log(selection)
      response(selection)
    })
  }

  handleResponse = (data: Array<Author>) => {
    let res = `
      <thead >
        <tr class="thead-row">
          <th>Id</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
        </tr>
      </thead>`
    data.forEach(author => {
      res += `<tr class="jbr-row">
                  <td>${author.id}</td>
                  <td>${author.firstname}</td>
                  <td>${author.lastname}</td>
                  <td>${author.mail}</td>
                </tr>`
    })
    //@ts-ignore
    this.querySelector('#res').innerHTML = res
  }

}

if (!customElements.get('bookstore-authors')) {
  customElements.define('bookstore-authors', BookstoreAuthors)
}
