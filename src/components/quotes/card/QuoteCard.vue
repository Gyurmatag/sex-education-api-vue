<template>
  <div class="md:w-3/4 bg-gray-800 rounded-lg shadow-lg">
    <div class="text-left m-4 text-white">
      {{ quote.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteCard',

  props: {
    quote: {
      type: Object,
      default: null
    }
  }
}
</script>
