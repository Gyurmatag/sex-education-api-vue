<template>
  <div class="w-full m-auto rounded">
    <div class="flex justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('dashBoard.title') }}
    </div>
    <div class="flex justify-center space-x-6 p-6">
      <admin-actions />
    </div>
  </div>
</template>

<script>
import AdminActions from '@/components/dashboard/admin/AdminActions'

export default {
  name: 'MainDashBoard',

  components: {
    AdminActions
  }
}
</script>

<style scoped>

</style>
