/**
 * Perform XPath query and return xmldocument
 * @param path
 * @param doc
 * @return xmldom
 */
export default function (path, doc) {
  // skal være et snapshot, idet en iterator medfører fejl når der
  // efterfølgende  manipuleres med resultatet på attribute og text nodes

  try {
    let nodesSnapshot = doc.evaluate(path, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    if (nodesSnapshot.snapshotLength === 0) {
      throw new Error('Dette er ikke en gyldig XPATH expression')
    }

    let xmldom = document.implementation.createDocument('', 'root', null)
    let newnode = null
    let newText = null

    for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
      let node = nodesSnapshot.snapshotItem(i)
      // behandlingen afhænger af nodeType
      switch (node.nodeType) {
        case 1: // Element node
          // Noden skal clones idet den ellers fjernes fra xmlEmployees
          xmldom.documentElement.appendChild(node.cloneNode(true))
          break
        case 2: // attrib node
          newnode = document.createElement('attribute')
          newText = document.createTextNode(node.nodeName + '=' + node.value)
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
    throw error
  }
}
