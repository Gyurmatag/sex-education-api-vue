<template>
  <div class="flex flex-col items-center mb-8 space-y-8 rounded">
    <div class="flex w-full justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('quote.list.title') }}
    </div>
    <div
      class="sm:flex sm:flex-wrap p-4 w-full justify-center"
    >
      <quote-card
        v-for="quote in quotes"
        :key="quote.id"
        :quote="quote"
      />
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from '@vue/apollo-composable'

import QuoteCard from '@/components/quotes/card/QuoteCard'
import quotesQuery from '@/graphql/queries/remote/quotes.query.gql'

export default {
  name: 'QuoteCardList',

  components: {
    QuoteCard
  },

  setup () {
    const { result, loading } = useQuery(quotesQuery, { skip: 0, limit: 6 })
    const quotes = useResult(result, null, data => data.quotes)

    return { quotes, loading }
  }
}
</script>
