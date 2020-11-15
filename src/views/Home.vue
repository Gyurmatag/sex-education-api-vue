<template>
  <div class="home-hero">
    <hero />
  </div>
  <div class="sm:flex sm:flex-wrap w-full justify-center">
    <character-card-list />
  </div>
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
