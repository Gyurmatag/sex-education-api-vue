<template>
  <div class="home-hero">
    <hero />
  </div>
  <character-card-list />
</template>

<script>
import Hero from '@/components/Hero'

import CharacterCardList from '@/components/characters/list/CharacterCardList'

export default {
  name: 'Home',
  components: {
    Hero,
    CharacterCardList
  }
}
</script>
