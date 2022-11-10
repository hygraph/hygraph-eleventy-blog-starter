const { v4: uuidv4 } = require('uuid');

module.exports = addId = (node) => {
    return {
        ...node,
        id: uuidv4()
    }

}