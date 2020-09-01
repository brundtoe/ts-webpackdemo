/**
 * formater authors i en array fra db.json
 */
import {SwapiTypes} from "./swapiTypes";

export default function (data: SwapiTypes) {
  let res = ''
  for (const [key, value] of Object.entries(data)) {
    res += `<tr><td >${key}</td><td>${value}</td></tr>`
  }
  return res
}
