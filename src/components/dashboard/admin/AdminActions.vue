<template>
  <router-link to="/character/new">
    <button class="w-48 p-6 disabled:opacity-50 text-white font-bold bg-yellow-800 rounded-md shadow">
      {{ $t('character.create.action') }}
    </button>
  </router-link>
  <button class="w-48 disabled:opacity-50 text-white font-bold bg-purple-800 rounded-md shadow">
    {{ $t('episode.create.action') }}
  </button>
</template>

<script>
export default {
  name: 'AdminActions'
}
</script>

<style scoped>

</style>
