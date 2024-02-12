const client = require('../utils/hygraphClient')
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



module.exports = async () => {
    const pages = await getHygraphPosts()

    return pages
}