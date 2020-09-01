
import {FetchError} from './swapiTypes'

export default (error: FetchError) => {
  const res: string = `<tr><td>Status</td><td >${error.status} </td></tr>
                <tr><td>Status text</td><td >${error.statusText}</td></tr>
                <tr><td>url</td><td >${error.url}</td></tr>`

  // error.headers.forEach(header => console.log(header))

  return res
}
