module.exports = {
    "embed": (children, node) => {
        console.log(node)
        return `<div class="embed test">${children}</div>`},
}