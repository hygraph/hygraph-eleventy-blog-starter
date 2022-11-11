const GraphQLClient = require('graphql-request').GraphQLClient
const isHeader = require('../utils/isHeader')
const addId = require('../utils/addId')
const TOC = require('table-of-contents-json');
const generateJSON = require('../utils/toc')

const {astToHtmlString} = require('@graphcms/rich-text-html-renderer')

// Get Hygraph posts for 11ty data
const getHygraphPosts = async () => {
    const client = new GraphQLClient('https://api-us-east-1.hygraph.com/v2/cl8vzs0jm7fb201ukbf4ahe92/master')
    const response = await client.request(`
    query MyQuery {
        posts {
          slug
          title
          content {
            json
          }
        }
      }
`    )

    return response.posts
}

const buildToc = (node) => {
    if (node.type === 'heading-one' || node.type === 'heading-two' || node.type === 'heading-three' || node.type === 'heading-four' || node.type === 'heading-five' || node.type === 'heading-six') {
        return {
            id: node.id,
            text: node.children[0].text,
        }
    }
}


const renderers = {
    h1: ({id, children}) => `<h1 id="${id}">${children}</h1>`,
    h2: ({id, children}) => `<h2 id="${id}">${children}</h2>`,
    h3: ({id, children}) => `<h3 id="${id}">${children}</h3>`,
    h4: ({id, children}) => `<h4 id="${id}">${children}</h4>`,
    h5: ({id, children}) => `<h5 id="${id}">${children}</h5>`,
    h6: ({id, children}) => `<h6 id="${id}">${children}</h6>`,
    
}

const addContent = async (post) => {
    const toc = new TOC;

    // Get the array of nodes from the JSON
    const content = post.content.json.children

    // Add an ID to each node (Used for Table of Contents)
    const contentWithIds = await content.map(addId)

    // Build the content as HTML
    const html = await astToHtmlString({content: contentWithIds, renderers: renderers})
    
    // Create a list of headers from the content
    const headers = await contentWithIds.filter(isHeader)
    const tocArray = await generateJSON(headers)


    // Return the post with additional fields for rendering in 11ty
    return { ...post, html, tocArray }
}


module.exports = async () => {
    const posts = await getHygraphPosts()
    const postsWithContent = posts.map(addContent)

    return postsWithContent
}