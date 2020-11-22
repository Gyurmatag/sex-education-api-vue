import { createApp, provide, h } from 'vue'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { VuelidatePlugin } from '@vuelidate/core'

import App from '@/App.vue'
import i18n from '@/locales/i18n'
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
  .use(i18n)
  .use(VuelidatePlugin)
  .mount('#app')
