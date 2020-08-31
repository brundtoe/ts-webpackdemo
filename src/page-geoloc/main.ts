import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import {LitElement, html, css} from 'lit-element'
const cities = require('../assets/data/geoloc.cities.json')
const usng = require('usng.js')

//console.log(cities)

const converter = new usng.Converter()

class GeolocCities extends LitElement {

  protected cities
  protected selection
  protected showTable

  static get properties() {
    return {
      cities: {type: Array},
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
    this.cities = cities
    this.selection = []
    this.showTable = false
  }

  render() {
    return html`
  <h2>Danske Regioner</h2>
  <slot name="regions" @click="${this.selectRegion}"></slot>
  <input type="button" id="readCities" @click="${this.resetCities}" value="Show all cities">
  <p>&nbsp;</p>
  <table class="${this.showTable?'show':'hide'}">
    <tr class="row">
      <th>id</th>
      <th>name</th>
      <th>zip</th>
      <th>latitude</th>
      <th>longitude</th>
      <th>Zone</th>
      <th>Easting</th>
      <th>Northing</th>
      </tr>
      ${this.selection.map(city => html`<tr class="row">
        <td>${city.id}</td>
        <td>${city.name}</td>
        <td>${city.zipcode}</td>
        <td>${city.lat}</td>
        <td>${city.long}</td>
        <td>${city.zone}</td>
        <td>${city.easting}</td>
        <td>${city.northing}</td>
        </tr>`)}  
  </table>
    `
  }

  resetCities(event) {
    this.selection = this.cities.map(city => {
      let utmCoord = converter.LLtoUTM(city.lat,city.long,[])
      console.log(utmCoord)
      city.zone = utmCoord.zoneNumber
      city.easting = Math.round(utmCoord.easting)
      city.northing = Math.round(utmCoord.northing)
      return city
    })
    this.showTable = true
  }

  selectRegion(event) {
    console.log(event.target)
    this.selection = this.cities
      .filter(city => city.region === event.target.textContent)
      .map(city => {
        let utmCoord = converter.LLtoUTM(city.lat,city.long,[])
        console.log(utmCoord)
        city.zone = utmCoord.zoneNumber
        city.easting = Math.round(utmCoord.easting)
        city.northing = Math.round(utmCoord.northing)
        return city
      })
    this.showTable = true
  }
}

//registrer elementet
window.customElements.define('geoloc-cities', GeolocCities)
