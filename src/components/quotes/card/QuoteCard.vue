<template>
  <div class="lg:flex w:11/12 sm:w-3/4 md:w-3/4 lg:w-2/5 xl:w-1/4 sm:m-4 mx-4 mt-4 bg-gray-800 rounded-lg shadow-lg">
    <div class="text-center lg:text-left m-4 text-white">
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
