/**
 * Anvendelse af client side windows.fetch
 *
 */

export default (url, domElement = 'resultat', handleResponse, handleError) => {
  fetch(url, {
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
      document.getElementById(domElement).innerHTML = res
    })
    .catch(error => {
      /**
      error.then(data => {
        const res = handleError(data)
        document.getElementById(domElement).innerHTML = res
      })
       */
    })
}
