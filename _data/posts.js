const GraphQLClient = require('graphql-request').GraphQLClient
const isHeader = require('../utils/isHeader')
const addId = require('../utils/addId')

const {astToHtmlString} = require('@graphcms/rich-text-html-renderer')
const generateJSON = require('nested-toc-json-generator')

// Get Hygraph posts for 11ty data
const getHygraphPosts = async () => {
    const client = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cljhg3w940kcw01um5tov6e2a/master')
    const response = await client.request(`
    query MyQuery {
        posts {
          slug
          title
          content {
            json
            html
          }
        }
      }
`    )

    return response.posts
}

const renderers = {
  h1: ({id, children}) => `<h1 id="${id}"><a href="#${id}">${children}</a></h1>`,
  h2: ({id, children}) => `<h2 id="${id}"><a href="#${id}">${children}</a></h2>`,
  h3: ({id, children}) => `<h3 id="${id}"><a href="#${id}">${children}</a></h3>`,
  h4: ({id, children}) => `<h4 id="${id}"><a href="#${id}">${children}</a></h4>`,
  h5: ({id, children}) => `<h5 id="${id}"><a href="#${id}">${children}</a></h5>`,
  h6: ({id, children}) => `<h6 id="${id}"><a href="#${id}">${children}</a></h6>`
}


async function addContent(post) {
  const content = post.content.json.children
  const contentWithIds = content.map(addId)

  const html = await astToHtmlString({content: contentWithIds, renderers: renderers})


  const headers = contentWithIds.filter(isHeader)
  const headerJson = headers.map(header => ({
    ...header,
    text: header.children[0].text
  }))
  console.log(headerJson)

  const tocArray = await generateJSON(headerJson)

  return {
    ...post,
    html,
    tocArray
  }

}


module.exports = async () => {
    const posts = await getHygraphPosts()
    const postsWithContent = posts.map(addContent)
    return postsWithContent
}