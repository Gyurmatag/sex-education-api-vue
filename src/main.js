import { createApp, provide, h } from 'vue'

import { DefaultApolloClient } from '@vue/apollo-composable'

import App from '@/App.vue'
import router from '@/router'
import apolloClient from '@/graphql/grapql'
import '@/registerServiceWorker'
import '@/assets/styles/main.css'

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
