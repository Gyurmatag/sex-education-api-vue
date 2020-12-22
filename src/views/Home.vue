<template>
  <div class="home-hero">
    <hero />
  </div>
  <character-card-list />
  <div class="sm:flex sm:flex-wrap p-4 w-full justify-center">
    <router-link to="/quotes">
      <button class="p-2 rounded-lg text-white font-bold bg-primary disabled:opacity-50 disabled:cursor-default">
        {{ $t('quote.list.action') }}
      </button>
    </router-link>
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
