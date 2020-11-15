<template>
  <character-card
    v-for="character in characters"
    :key="character.id"
    :character="character"
  />
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'

import CharacterCard from '@/components/characters/card/CharacterCard'
import charactersQuery from '@/graphql/characters.query.gql'

export default {
  name: 'CharacterCardList',

  components: {
    CharacterCard
  },

  setup () {
    const { result, loading } = useQuery(charactersQuery, { skip: 0, limit: 6 })
    const characters = useResult(result, null, data => data.characters)

    return { characters, loading }
  }
}
</script>

<style scoped>

</style>
