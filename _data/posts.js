const GraphQLClient = require('graphql-request').GraphQLClient

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



module.exports = async () => {
    const posts = await getHygraphPosts()

    return posts
}