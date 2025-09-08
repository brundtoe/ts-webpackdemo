/**
 * Perform XPath query and return xmlDocumentFragment
 * @param path
 * @param doc
 * @return xmldom
 */
export function performQuery(path: string, doc: Document): XMLDocument {
    // skal være et snapshot, idet en iterator medfører fejl når der
    // efterfølgende manipuleres med resultatet på attribute og text nodes

    try {
        let nodesSnapshot: XPathResult = doc.evaluate(path, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        if (nodesSnapshot.snapshotLength === 0) {
            const errorText = '<error>performQuery: Generating Snapshot mislykkedes</error>'
            return new DOMParser().parseFromString(errorText, 'text/xml')
        }

        const queryResult = buildDocumentFromElements(nodesSnapshot)

        return queryResult


    } catch (error: Error | unknown) {
        console.log(error)
        const errorText = '<error>performQuery: Transformationen mislykkedes</error>'
        return new DOMParser().parseFromString(errorText, 'text/xml')
    }
}

function buildDocumentFromElements(nodeList: { snapshotLength: any; snapshotItem: (arg0: number) => any }) {
    try {
        const xmlDom = document.implementation.createDocument("", "root", null);
        const numNodes = nodeList.snapshotLength;
        for (let i = 0; i < numNodes; i++) {
            const newNode = processElementByType(nodeList.snapshotItem(i));
            if (newNode !== undefined) {
                xmlDom.documentElement.appendChild(newNode)
            }
        }
        //console.log(xmldom);
        return xmlDom
    } catch (ex) {
        console.log(ex);
        const errorText = '<error>buildDocumentFromElements: Transformationen mislykkedes</error>'
        return new DOMParser().parseFromString(errorText, 'text/xml')
    }
}

function processElementByType(node: {
    nodeType: any;
    cloneNode: (arg0: boolean) => any;
    nodeName: string;
    value: string
}) {
    switch (node.nodeType) {
        case 1: //Element node
            //Noden skal clones idet den ellers fjernes fra xmlEmployees
            return node.cloneNode(true);
        case 2: //attrib node
            const newAttribute = document.createElement("attribute");
            const newText = document.createTextNode(node.nodeName + "=" + node.value);
            newAttribute.appendChild(newText);
            return newAttribute;
        case 3: //text node
            const newTextNode = document.createElement("text");
            newTextNode.appendChild(node.cloneNode(true));
            return newTextNode;
        default:
            return undefined;
    }
}

