const escapeHtml = require('escape-html')
module.exports = {
    "list-item":       (children, node) => `<li>${children}</li>`,
    "list-item-child": (children, node) => `${children}`,
    "bulleted-list":   (children, node) => `<ul>${children.join('')}</ul>`,
    "numbered-list" :  (children, node) =>`<ol>${children.join('')}</ol>`,
    "heading-one" :  (children, node) =>`<h1>${children}</h1>`,
    "heading-two" :  (children, node) =>`<h2 >${children}</h2>`,
    "heading-three" :  (children, node) =>`<h3 >${children}</h3>`,
    "heading-four" :  (children, node) =>`<h4 >${children}</h4>`,
    "heading-five" :  (children, node) =>`<h5 >${children}</h5>`,
    "heading-six" :  (children, node) =>`<h6 >${children}</h6>`,
    "block-quote" :  (children, node) =>`<blockquote><p>${children}</p></blockquote>`,
    "paragraph" :  (children, node) =>`${children.length > 0 && `<p>${children.join('')}</p>`}`,
    "link" : (children, node) => `<a href="${escapeHtml(node.href)}" ${node.title ? `title="${node.title}"` : ""} ${node.openInNewTab ? "target='_blank'": ''}>${children}</a>`,
    "default" : (children, node) => children,
    "embed": (children, node) => `<div class="embed">${children}</div>`,

}