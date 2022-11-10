const defaultTypes = require('./defaultTypes')
const customTypes = require('./customTypes')
const mergeTypes = require('./mergeTypes')

module.exports = types = mergeTypes(defaultTypes, customTypes)