import { createApp, provide, h } from 'vue'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from '@/App.vue'
import router from '@/router'
import '@/registerServiceWorker'
import '@/assets/styles/main.css'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_BACKEND_BASE_URI
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

createApp(
  {
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
    render () {
      return h(App)
    }
  }
)
  .use(router)
  .mount('#app')
