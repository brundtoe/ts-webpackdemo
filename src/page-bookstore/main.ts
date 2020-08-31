import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import {bookstore} from './bookstore'
import {LitElement, html, css} from 'lit-element'

console.log(bookstore.customers)

class BookstoreCustomers extends LitElement {

  protected customers
  protected selection
  protected showTable

  static get properties() {
    return {
      customers: {type: Array},
      selection: {type: Array},
      showTable: {type: Boolean}
    }
  }

  static get styles() {
    return css`
    :host {
      display: block;
      margin: auto;
      border: 1px solid #d5d5d5;
      align-items: center;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
      font-family: sans-serif;
    }
    table {
      margin: auto;
    }
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    th, td {
      padding: 5px;
    }
    .row:first-child {
      background: #FF0
    }
    .row:nth-child(2n) {
      background-color: #FFF;
    }
    .row:nth-child(2n+3) {
      background: #d5d5d5
    }
    .hide {
      visibility: hidden;
    }
    .show {
      visibility: visible;
      }
    `
  }

  constructor() {
    super();
    this.customers = bookstore.customers
    this.selection = []
    this.showTable = false
  }

  render() {
    return html`
  <h2>Bookstore Customers</h2>
  <slot name="states" @click="${this.selectState}"></slot>
  <input type="button" id="readCustomers" @click="${this.resetCustomers}" value="Show all customers">
  <p>&nbsp;</p>
  <table class="${this.showTable?'show':'hide'}">
    <tr class="row">
      <th>Name</th>
      <th>City</th>
      <th>State</th>
      <th>Email</th>
      </tr>
      ${this.selection.map(customer => html`<tr class="row">
        <td>${customer.name}</td>
        <td>${customer.city}</td>
        <td>${customer.state}</td>
        <td>${customer.mail}</td></tr>`)}  
  </table>
    `
  }

  resetCustomers(event) {
    this.selection = this.customers
    this.showTable = true
  }

  selectState(event) {
    console.log(event.target)
    this.selection = this.customers.filter(customer => customer.state === event.target.textContent)
    this.showTable = true
  }
}

//registrer elementet
window.customElements.define('bookstore-customers', BookstoreCustomers)
