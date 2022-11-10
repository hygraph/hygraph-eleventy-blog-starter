module.exports = {
    "heading-one" :  (children, node) =>`<h1 id=${node?.id}>${children}</h1>`,
    "heading-two" :  (children, node) =>`<h2 id=${node?.id}>${children}</h2>`,
    "heading-three" :  (children, node) =>`<h3 id=${node?.id}>${children}</h3>`,
    "heading-four" :  (children, node) =>`<h4 id=${node?.id}>${children}</h4>`,
    "heading-five" :  (children, node) =>`<h5 id=${node?.id}>${children}</h5>`,
    "heading-six" :  (children, node) =>`<h6 id=${node?.id}>${children}</h6>`,
    "embed": (children, node) => {
        console.log(node)
        return `<div class="embed test">${children}</div>`},
}