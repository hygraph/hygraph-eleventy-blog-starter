module.exports = mergeTypes = (defaultTypes, customTypes) => {
    return {
        ...defaultTypes,
        ...customTypes
    }
}