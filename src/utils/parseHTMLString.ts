type HTMLObject = {
    text: string;
    strong: HTMLObject[];
    em: HTMLObject[];
    span: HTMLObject[];
    br: HTMLObject[];
    a: HTMLObject[];
};

export function parseHTMLString(htmlString: string): HTMLObject[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const rootNodes = Array.from(doc.body.childNodes);
    const result: HTMLObject[] = [];

    rootNodes.forEach(node => {
        const obj: HTMLObject = { text: '', strong: [], em: [], span: [], br: [], a: [] };
        parseNode(node, obj);
        result.push(obj);
    });

    return result;
}

function parseNode(node: Node, obj: HTMLObject) {
    if (node.nodeType === Node.TEXT_NODE) {
        obj.text += node.textContent || '';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        switch (element.tagName.toLowerCase()) {
            case 'strong':
                obj.strong.push({ text: '', strong: [], em: [], span: [], br: [], a: [] });
                break;
            case 'em':
                obj.em.push({ text: '', strong: [], em: [], span: [], br: [], a: [] });
                break;
            case 'span':
                obj.span.push({ text: '', strong: [], em: [], span: [], br: [], a: [] });
                break;
            case 'br':
                obj.br.push({ text: '', strong: [], em: [], span: [], br: [], a: [] });
                break;
            case 'a':
                obj.a.push({ text: '', strong: [], em: [], span: [], br: [], a: [] });
                break;
            default:
                Array.from(element.childNodes).forEach(childNode => {
                    parseNode(childNode, obj);
                });
                break;
        }
    }
}
