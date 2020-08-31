import performQuery from './performQuery.js'

export default function (xslFile, xmlFile = null) {
  this.xmlFile = xmlFile
  this.xslFile = xslFile
  this.xmlDom = null
  this.xslStyle = null

  /*
  this.options = (path) => {
    const paths = this.pattern.querySelectorAll(path)
    let optionValues = ''
    for (let path of paths) {
      optionValues += `<option>${path.textContent}</option>`
    }
    return optionValues
  }
*/
  this.fetchFiles = async function (axiosInstance) {
    try {
      const xmlText = await axiosInstance(this.xmlFile)
      const xslText = await axiosInstance(this.xslFile)
      return { xmlText, xslText }
    } catch (error) {
      console.log(error)
    }
  }

  this.convertXml = (xmlText, xslText) => {
    const domparser = new DOMParser()
    const mimetype = 'text/xml'
    this.xmlDom = domparser.parseFromString(xmlText, mimetype)
    this.xslStyle = domparser.parseFromString(xslText, mimetype)
  }

  this.transformXml= (xslstyle, xmldom) => {
    let processor = new XSLTProcessor()
    processor.importStylesheet(xslstyle)
    return processor.transformToFragment(xmldom, window.document)
  }

  this.execQuery = (query) => {
    try {
      const queryResult = performQuery(query, this.xmlDom)
      console.log('fortsætter med transformering')
      const transformResult = this.transformXml(this.xslStyle, queryResult)
      return transformResult
    } catch (error) {
      console.log('rethrown error', error)
      console.log('denne fejl er fra performQuery')
      throw error
    }
  }
}
