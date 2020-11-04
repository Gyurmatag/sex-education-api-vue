<template>
  <div>{{ character.name }}</div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      default: null
    }
  }
}
</script>
