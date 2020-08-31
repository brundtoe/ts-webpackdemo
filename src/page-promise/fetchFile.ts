/**
 * Anvendelse af client side windows.fetch
 *
 */
import docElement from '../modules/renderElement'

export default (url, domElement = 'resultat', handleResponse, handleError) => {

    window.fetch(url, {
        method: 'GET',
        cache: 'no-cache'
    })
        .then(res => {
            const data = res.json()
            if (res.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
        .then(data => {
            // console.log(data)
            const res = handleResponse(data)
            docElement.renderHtml(domElement, res)
        })
        .catch(error => {
            error.then(data => {
                const res = handleError(data)
                docElement.renderHtml(domElement, res)
            })
        })
}
//@ts-ignore
