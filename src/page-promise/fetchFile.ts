/**
 * Anvendelse af client side windows.fetch
 *
 */
import docElement from '../modules/renderElement'
import {SwapiTypes, FetchError} from "./swapiTypes";

export default (url: string, domElement: string = 'resultat', handleResponse: Function, handleError: Function) => {

    window.fetch(url, {
        method: 'GET',
        cache: 'no-cache'
    })
        .then(res => {
            const data: Promise<SwapiTypes> = res.json()
            if (res.ok) {
                return data
            } else {
                throw new Error(`Data er ikke indlæst fra ${url}`)
            }
        })
        .then(data => {
            console.log(data)
            const res = handleResponse(data)
            docElement.renderHtml(domElement, res)
        })
        .catch(error  => {
            const res: string = handleError(error)
            docElement.renderHtml(domElement, res)
        })
}

