import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client/core'
import { InMemoryCache } from 'apollo-cache-inmemory'
import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_BACKEND_BASE_URI
})

const cache = new InMemoryCache()
cache.writeData({ data: { authDataLocal: null } })

const authMiddleware = new ApolloLink((operation, forward) => {
  const data = cache.readQuery({ query: authDataLocalQuery })
  const token = data?.authDataLocal?.token
  operation.setContext({
    headers: {
      'x-token': token || null
    }
  })

  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache
})

export default apolloClient
