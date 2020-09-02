import {performQuery} from './performQuery'

export default class Pattern {

    protected xmlFile: string
    protected xslFile: string
    protected xmlDom: Document
    protected xslStyle: Document


    constructor(xslFile: string, xmlFile: string) {
        this.xmlFile = xmlFile
        this.xslFile = xslFile
        this.xmlDom = new Document()
        this.xslStyle = new Document()
    }

    async fetchFiles(this: Pattern) {
        try {
            const xmlText = await window.fetch(this.xmlFile).then((data: Response) => {return data.text()})
            const xslText = await window.fetch(this.xslFile).then((data) => {
                return data.text()
            })
            return {xmlText, xslText}
        } catch (error) {
            console.log(error)
            return false
        }
    }

    convertXml(this: Pattern, xmlText: string, xslText: string) {
        const domparser = new DOMParser()
        const mimetype = 'text/xml'
        this.xmlDom = domparser.parseFromString(xmlText, mimetype)
        this.xslStyle = domparser.parseFromString(xslText, mimetype)
    }

    transformXml(xslstyle: Node, xmldom: Node) {
        let processor = new XSLTProcessor()
        processor.importStylesheet(xslstyle)
        return processor.transformToFragment(xmldom, window.document)
    }

    execQuery(this: Pattern, query: string ) {
        try {
            const queryResult: Document | DocumentFragment = performQuery(query, this.xmlDom)
            if(!queryResult) {
                return
            }
            console.log('fortsætter med transformering')
            return this.transformXml(this.xslStyle, queryResult)
        } catch (error) {
            console.log('rethrown error', error)
            console.log('denne fejl er fra performQuery')
            throw error
        }
    }
}
