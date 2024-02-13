const client = require('../utils/hygraphClient')

// Get Hygraph posts for 11ty data
const getHygraphPosts = async () => {
    const response = await client.request(`
    query NavigationQuery {
        navigations {
            id
            link {
                externalUrl
                displayText
                page {
                  ... on Page {
                    id
                    slug
                  }
                }
              }
            navId
            
        }
    }
      
`    )

    const navById = {}
    
    response.navigations.forEach((nav) => {
      navById[nav.navId] = nav   
    })

    return navById
}



module.exports = async () => {
    const pages = await getHygraphPosts()

    return pages
}