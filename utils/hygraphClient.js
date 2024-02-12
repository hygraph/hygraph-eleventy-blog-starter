const GraphQLClient = require('graphql-request').GraphQLClient

require('dotenv').config()

const client = new GraphQLClient(
    process.env.HYGRAPH_URL
  );

module.exports = client
