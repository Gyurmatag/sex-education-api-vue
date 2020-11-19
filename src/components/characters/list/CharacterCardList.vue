<template>
  <div
    v-if="loading"
    class="sm:flex sm:flex-wrap p-4 w-full justify-center"
  >
    <character-card-skeleton
      v-for="index in 9"
      :key="index"
    />
  </div>
  <div
    v-else
    class="sm:flex sm:flex-wrap p-4 w-full justify-center"
  >
    <character-card
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'

import CharacterCard from '@/components/characters/card/CharacterCard'
import charactersQuery from '@/graphql/queries/characters.query.gql'
import CharacterCardSkeleton from '@/components/characters/card/CharacterCardSkeleton'

export default {
  name: 'CharacterCardList',

  components: {
    CharacterCardSkeleton,
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
