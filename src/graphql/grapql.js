import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'
import refreshAccessTokenMutation from '@/graphql/mutations/refreshAccessToken.mutation.gql'
import router from '@/router'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_BACKEND_BASE_URI
})

const cache = new InMemoryCache()
cache.writeData({ data: { authDataLocal: null } })

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // eslint-disable-next-line no-console
      console.log(`[GraphQL error]: Message: ${err.message}, Path: ${err.path}`)
      if (err.extensions.code === 'UNAUTHENTICATED') {
        const data = cache.readQuery({ query: authDataLocalQuery })

        if (data.authDataLocal?.refreshToken) {
          apolloClient.mutate({
            mutation: refreshAccessTokenMutation,
            variables: {
              availableRefreshToken: data.authDataLocal.refreshToken
            }
          }).then(res => {
            const refreshedAuthData = res.data.refreshAccessToken
            data.authDataLocal = {
              ...refreshedAuthData
            }
            cache.writeQuery({ query: authDataLocalQuery, data })
            const oldHeaders = operation.getContext().headers
            operation.setContext({
              headers: {
                ...oldHeaders,
                'x-access-token': data.authDataLocal.accessToken || null
              }
            })
            // FIXME: itt valami nem jó (nem ismétli meg a kérést)
            return forward(operation)
          })
            .catch(_ => {
              cache.writeQuery({ query: authDataLocalQuery, data: null })
              router.push('/auth/login')
            })
        }
      }
    }
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
