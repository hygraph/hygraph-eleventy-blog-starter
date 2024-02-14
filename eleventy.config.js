// eleventy config

module.exports = function(eleventyConfig) {
    // pass through static directory
    eleventyConfig.addPassthroughCopy("static");
}