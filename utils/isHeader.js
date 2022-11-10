module.exports = isHeader = (node) => {
    return node.type === 'heading-one' || node.type === 'heading-two' || node.type === 'heading-three' || node.type === 'heading-four' || node.type === 'heading-five' || node.type === 'heading-six'
}