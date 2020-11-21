<template>
  <div class="mx-auto text-center py-6 h-48 bg-mainbackground text-lg text-white">
    <documents-count />
    <built-with />
    <div class="p-2">
      <p class="text-sm text-gray-500">
        &lt;&gt; by <strong class="text-white hover:text-secondary cursor-pointer">Varga György</strong>
      </p>
    </div>
  </div>
</template>

<script>
import DocumentsCount from '@/components/information/DocumentsCount'
import BuiltWith from '@/components/information/BuiltWith'

export default {
  name: 'FooterBar',

  components: {
    DocumentsCount,
    BuiltWith
  }
}
</script>

<style scoped>
</style>
