<template>
  <div class="home-hero">
    <hero />
  </div>
  <character-card-list />
  <p v-if="authData?.token">
    {{ authData?.token }}
  </p>
  <button @click="setAuthDataLocal()">
    Write authData
  </button>
</template>

<script>
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'

import Hero from '@/components/Hero'
import CharacterCardList from '@/components/characters/list/CharacterCardList'
import authDataLocalQuery from '@/graphql/queries/authDataLocal.query.gql'
import setAuthDataLocalMutation from '@/graphql/mutations/setAuthDataLocal.mutation.gql'

export default {
  name: 'Home',
  components: {
    Hero,
    CharacterCardList
  },

  setup () {
    const { result: authDataResult } = useQuery(authDataLocalQuery)
    const authData = useResult(authDataResult, null, data => data.authDataLocal)

    const { mutate: setAuthDataLocal } = useMutation(setAuthDataLocalMutation, () => ({ variables: { token: 'asd123' } }))

    return { authData, setAuthDataLocal }
  }
}
</script>
