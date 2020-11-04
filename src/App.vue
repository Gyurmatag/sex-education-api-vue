<template>
  <navbar v-if="isNavbarNeeded" />
  <router-view />
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'

import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  setup () {
    const route = useRoute()
    const isNavbarNeeded = computed(() => route.name !== 'Home')

    return { isNavbarNeeded }
  }
}
</script>

<style lang="scss">
</style>
