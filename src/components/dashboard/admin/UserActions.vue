<template>
  <button
    class="p-2 rounded-lg text-white font-bold bg-primary opacity-80 disabled:opacity-50 disabled:cursor-default"
    :disabled="logoutLoading"
    @click="logoutClicked"
  >
    {{ $t('logout.action') }}
  </button>
</template>

<script>
import apolloClient from '@/graphql/grapql'
import authDataLocalQuery from '@/graphql/queries/local/authDataLocal.query.gql'
import { useMutation } from '@vue/apollo-composable'
import logoutMutation from '@/graphql/mutations/remote/logout.mutation.gql'
import router from '@/router'

export default {
  name: 'UserActions',

  setup () {
    const {
      mutate: logout,
      loading: logoutLoading,
      onDone: logoutDone
    } = useMutation(logoutMutation, () => ({
      update: (cache, { data: { logout } }) => {
        const data = cache.readQuery({ query: authDataLocalQuery })
        data.authDataLocal = logout
        cache.writeQuery({ query: authDataLocalQuery, data })
      }
    }))

    const logoutClicked = () => {
      const authData = apolloClient.cache.readQuery({ query: authDataLocalQuery })
      logout({ refreshToken: authData.authDataLocal.refreshToken })
    }

    logoutDone(result => {
      router.push('/auth/login')
    })

    return { logoutClicked, logoutLoading }
  }
}
</script>
