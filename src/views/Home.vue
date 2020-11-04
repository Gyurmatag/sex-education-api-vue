<template>
  <div class="home">
    <hero />
  </div>
  <div class="home-characters">
    <character-card
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'

import Hero from '@/components/Hero'
import CharacterCard from '@/components/characters/CharacterCard'
import charactersQuery from '@/graphql/characters.query.gql'

export default {
  name: 'Home',
  components: {
    Hero,
    CharacterCard
  },
  setup () {
    const { result } = useQuery(charactersQuery, { skip: 0, limit: 6 })
    const characters = useResult(result, null, data => data.characters)

    return { characters }
  }
}
</script>
