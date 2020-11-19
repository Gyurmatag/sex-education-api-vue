import { ApolloClient, createHttpLink } from '@apollo/client/core'
import { InMemoryCache } from 'apollo-cache-inmemory'

import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_BACKEND_BASE_URI
})

const cache = new InMemoryCache()
cache.writeData({ data: { authDataLocal: null } })

const resolvers = {
  Mutation: {
    setAuthDataLocal (_, { token }, { cache }) {
      const data = cache.readQuery({ query: authDataLocalQuery })
      data.authDataLocal = { __typename: 'AuthDataLocal', token: token }
      cache.writeQuery({ query: authDataLocalQuery, data })
    }
  }
}

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  resolvers
})

export default apolloClient
