const client = require('../utils/hygraphClient')
const { astToHtmlString } = require("@graphcms/rich-text-html-renderer");

// Get Hygraph posts for 11ty data
const getHygraphPosts = async () => {

  const response = await client.request(`
    query MyQuery {
        pages {
          slug
          title
          content {
            raw
            html
          }
        }
      }
`    )
    return response.pages
}


async function addContent(post) {
  const content = post.content.raw.children;

  const html = await astToHtmlString({
    content: content
  });
  return {...post, html}
}

module.exports = async () => {
    const pages = await getHygraphPosts()
    const pagesWithContent = await Promise.all(pages.map(addContent))

    return pagesWithContent
}