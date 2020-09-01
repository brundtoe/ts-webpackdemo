import performQuery from './performQuery.js'

export default function (xslFile, xmlFile = null) {
  this.xmlFile = xmlFile
  this.xslFile = xslFile
  this.xmlDom = null
  this.xslStyle = null

  this.fetchFiles = async function () {
    try {
      const xmlRes = await window.fetch(this.xmlFile)
      const xslRes = await window.fetch(this.xslFile)
      const xmlText = await(xmlRes).text()
      const xslText = await (xslRes).text()
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
