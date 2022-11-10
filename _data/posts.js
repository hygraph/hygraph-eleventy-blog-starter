const GraphQLClient = require('graphql-request').GraphQLClient
const slate = require('slate')
const escapeHtml = require('escape-html')
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid');

const isHeader = (node) => {
    return node.type === 'heading-one' || node.type === 'heading-two' || node.type === 'heading-three' || node.type === 'heading-four' || node.type === 'heading-five' || node.type === 'heading-six'
}
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


const addId = (node) => {
    return {
        ...node,
        id: uuidv4()
    }

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

            return string
        }
        

        const children = await Promise.all(node.children.map(n => serializer(n)))
        
        switch (node.type) {
            case 'list-item':
                return `<li>${children}</li>`
            case 'bulleted-list':
                return `<ul>${children.join('')}</ul>`
            case 'numbered-list':
                return `<ol>${children.join('')}</ol>`
            case 'heading-one':
                return `<h1 id=${node?.id}>${children}</h1>`
            case 'heading-two':
                return `<h2 id=${node?.id}>${children}</h2>`
            case 'heading-three':
                return `<h3 id=${node?.id}>${children}</h3>`
            case 'heading-four':
                return `<h4 id=${node?.id}>${children}</h4>`
            case 'heading-five':
                return `<h5 id=${node?.id}>${children}</h5>`
            case 'heading-six':
                return `<h6 id=${node?.id}>${children}</h6>`
            
            case 'block-quote':
            return `<blockquote><p>${children}</p></blockquote>`
            case 'paragraph':
            return `<p>${children}</p>`
            case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
            default:
            return children
        }
    }


const addContent = async (post) => {
    const content = post.content.json.children

    const contentWithIds = await content.map(addId)

    const contentString = await serialize(contentWithIds)
    const headers = await contentWithIds.filter(isHeader)
    const toc = await headers.map(buildToc)

    return {...post, contentString, toc}
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