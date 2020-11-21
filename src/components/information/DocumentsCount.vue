<template>
  <div
    v-if="!loading"
    class="p-4 text-sm text-gray-500"
  >
    <span class="px-2">{{ $t('info.characters', { count: documentsCount.charactersCount }) }}</span>
    <span class="px-2">{{ $t('info.episodes', { count: documentsCount.episodesCount }) }}</span>
    <span class="px-2">{{ $t('info.seasons', { count: documentsCount.seasonsCount }) }}</span>
  </div>
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'
import countDocumentsQuery from '@/graphql/queries/countDocuments.query.gql'

export default {
  name: 'DocumentsCount',

  setup () {
    const { result, loading } = useQuery(countDocumentsQuery)
    const documentsCount = useResult(result, null, data => data.countDocuments)

    return { documentsCount, loading }
  }

}
</script>

<style scoped>

</style>
