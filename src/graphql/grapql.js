import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_BACKEND_BASE_URI
})

const cache = new InMemoryCache()
cache.writeData({ data: { authDataLocal: null } })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ extensions, message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.log(`[Network error]: ${networkError}`)
  }
})

const authLink = new ApolloLink((operation, forward) => {
  const data = cache.readQuery({ query: authDataLocalQuery })
  const accessToken = data?.authDataLocal?.accessToken
  operation.setContext({
    headers: {
      'x-access-token': accessToken || null
    }
  })

  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache
})

export default apolloClient
