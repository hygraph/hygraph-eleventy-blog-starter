const GraphQLClient = require('graphql-request').GraphQLClient

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