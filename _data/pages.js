const GraphQLClient = require('graphql-request').GraphQLClient

// Get Hygraph posts for 11ty data
const getHygraphPosts = async () => {
    const client = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cljhg3w940kcw01um5tov6e2a/master')
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