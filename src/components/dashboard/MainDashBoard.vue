<template>
  <div class="flex flex-col w-full content-center rounded">
    <div class="flex justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('dashBoard.title') }}
    </div>
    <div class="flex justify-center space-x-6 p-6">
      <admin-actions />
    </div>
    <div class="flex justify-center space-x-6 p-6">
      <user-actions />
    </div>
  </div>
</template>

<script>
import AdminActions from '@/components/dashboard/admin/AdminActions'
import UserActions from '@/components/dashboard/admin/UserActions'

export default {
  name: 'MainDashBoard',

  components: {
    AdminActions,
    UserActions
  }
}
</script>

<style scoped>

</style>
