const escapeHtml = require('escape-html')
module.exports = {
    "list-item":       (children, node) => `<li>${children}</li>`,
    "list-item-child": (children, node) => `${children}`,
    "bulleted-list":   (children, node) => `<ul>${children.join('')}</ul>`,
    "numbered-list" :  (children, node) =>`<ol>${children.join('')}</ol>`,
    "heading-one" :  (children, node) =>`<h1 id=${node?.id}>${children}</h1>`,
    "heading-two" :  (children, node) =>`<h2 id=${node?.id}>${children}</h2>`,
    "heading-three" :  (children, node) =>`<h3 id=${node?.id}>${children}</h3>`,
    "heading-four" :  (children, node) =>`<h4 id=${node?.id}>${children}</h4>`,
    "heading-five" :  (children, node) =>`<h5 id=${node?.id}>${children}</h5>`,
    "heading-six" :  (children, node) =>`<h6 id=${node?.id}>${children}</h6>`,
    "block-quote" :  (children, node) =>`<blockquote><p>${children}</p></blockquote>`,
    "paragraph" :  (children, node) =>`<p>${children.join('')}</p>`,
    "link" : (children, node) => `<a href="${escapeHtml(node.href)}" ${node.title ? `title="${node.title}"` : ""} ${node.openInNewTab ? "target='_blank'": ''}>${children}</a>`,
    "default" : (children, node) => children,
    "embed": (children, node) => `<div class="embed">${children}</div>`,

}