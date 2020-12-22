<template>
  <div class="flex flex-col mb-8 space-y-8 rounded">
    <div class="flex w-full justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('quote.list.title') }}
    </div>
    <div
      class="flex flex-col space-y-5 p-4 items-center"
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
import quoteCreatedSubscription from '@/graphql/subscriptions/quoteCreated.subscription.gql'

export default {
  name: 'QuoteCardList',

  components: {
    QuoteCard
  },

  setup () {
    const { result: quotesResult, loading: quotesLoading, subscribeToMore } = useQuery(quotesQuery, { skip: 0, limit: 6 })
    const quotes = useResult(quotesResult, null, data => data.quotes)

    subscribeToMore(() => ({
      document: quoteCreatedSubscription,
      updateQuery: (previousResult, { subscriptionData }) => {
        previousResult.quotes.unshift(subscriptionData.data.quoteCreated)
        return previousResult
      }
    }))

    return { quotes, quotesLoading }
  }
}
</script>
