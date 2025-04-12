/**
 * Perform XPath query and return xmlDocumentFragment
 * @param path
 * @param doc
 * @return xmldom
 */
export function performQuery(path: string, doc: Document): Document | DocumentFragment {
  // skal være et snapshot, idet en iterator medfører fejl når der
  // efterfølgende manipuleres med resultatet på attribute og text nodes

  try {
    let nodesSnapshot: XPathResult = doc.evaluate(path, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    if (nodesSnapshot.snapshotLength === 0) {
      // noinspection ExceptionCaughtLocallyJS
        throw new Error('Dette er ikke en gyldig XPATH expression')
    }

    let xmldom = document.implementation.createDocument('', 'root', null)
    let newnode: Node | null
    let newText: Text

    for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
      let node: Node | null = nodesSnapshot.snapshotItem(i)
      if (!node) {
        return new DocumentFragment()
      }
      // behandlingen afhænger af nodeType
      switch (node.nodeType) {
        case 1: // Element node
          // Noden skal clones idet den ellers fjernes fra xmlEmployees
          xmldom.documentElement.appendChild(node.cloneNode(true))
          break
        case 2: // attrib node
          newnode = document.createElement('attribute')
          newText = document.createTextNode(node.nodeName + '=' + node.nodeValue)
          newnode.appendChild(newText)
          xmldom.documentElement.appendChild(newnode)
          break
        case 3: // text node
          newnode = document.createElement('text')
          newnode.appendChild(node.cloneNode(true))
          xmldom.documentElement.appendChild(newnode)
          break
        default:
        // Skip alle andre node types
      }
    }
    return xmldom
  } catch (error) {
    console.log(error)
    return new DocumentFragment()
  }
}
