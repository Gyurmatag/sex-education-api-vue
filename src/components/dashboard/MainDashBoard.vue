<template>
  <div class="flex flex-col w-full content-center rounded">
    <div class="flex justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('dashBoard.title') }}
    </div>
    <div
      v-if="authData.authDataLocal.user.role === 'ADMIN'"
      class="flex justify-center space-x-6 p-6"
    >
      <admin-actions />
    </div>
    <div class="flex justify-center space-x-6 p-6">
      <logout-action />
    </div>
  </div>
</template>

<script>
import AdminActions from '@/components/dashboard/admin/AdminActions'
import LogoutAction from '@/components/dashboard/shared/LogoutAction'
import apolloClient from '@/graphql/grapql'
import authDataLocalQuery from '@/graphql/queries/local/authDataLocal.query.gql'

export default {
  name: 'MainDashBoard',

  components: {
    AdminActions,
    LogoutAction
  },

  setup () {
    const authData = apolloClient.cache.readQuery({ query: authDataLocalQuery })

    return { authData }
  }
}
</script>
