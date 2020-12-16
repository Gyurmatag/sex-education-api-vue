<template>
  <router-link to="/quote/new">
    <button class="w-48 p-6 disabled:opacity-50 text-white font-bold bg-green-800 rounded-md shadow">
      {{ $t('quote.create.action') }}
    </button>
  </router-link>
</template>

<script>

export default {
  name: 'UserActions'

}
</script>
