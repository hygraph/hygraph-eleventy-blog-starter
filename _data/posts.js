const GraphQLClient = require('graphql-request').GraphQLClient
const slate = require('slate')
const escapeHtml = require('escape-html')
const slugify = require('slugify')
const isHeader = require('../utils/isHeader')
const addId = require('../utils/addId')
const types = require('../utils/finalTypes')
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

const serializer = async (node) => {
    if (slate.Text.isText(node)) {

        let string = escapeHtml(node.text)
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        if (node.italic) {
            string = `<em>${string}</em>`
        }
        if (node.underline) {
            string = `<u>${string}</u>`
        }
        if (node.strikethrough) {
            string = `<s>${string}</s>`
        }
        if (node.code) {
            string = `<code>${string}</code>`
        }
        console.log(string)
        return string
    }


    const children = await Promise.all(node.children.map(n => serializer(n)))

    if (!node || !node.type || node.type === undefined) return types['default'](children, node)

    return types[node.type](children, node)

}


const addContent = async (post) => {
    const content = post.content.json.children

    const contentWithIds = await content.map(addId)

    const contentString = await serialize(contentWithIds)
    const headers = await contentWithIds.filter(isHeader)
    const toc = await headers.map(buildToc)

    return { ...post, contentString, toc }
}

const serialize = async (nodes) => {
    const serialized = await Promise.all(nodes.map(serializer))

    return serialized.join('')
}

module.exports = async () => {
    const posts = await getHygraphPosts()
    const postsWithContent = posts.map(addContent)

    return postsWithContent
}