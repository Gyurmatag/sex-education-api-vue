<template>
  <div class="flex flex-col mb-8 space-y-8 rounded">
    <div class="flex w-full justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('quote.list.title') }}
    </div>
    <div
      class="flex flex-col space-y-5 p-4 items-center"
    >
      <quote-card
        v-for="quote in quotes?.results"
        :key="quote._id"
        :quote="quote"
      />
      <button
        v-if="quotes?.hasNext"
        class="p-2 rounded-lg text-white font-bold bg-gray-800"
        @click="loadMore"
      >
        Load more
      </button>
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
    const { result: quotesResult, loading: quotesLoading, subscribeToMore, fetchMore } = useQuery(quotesQuery, { limit: 5 })
    const quotes = useResult(quotesResult, null, data => data.quotes)

    function loadMore () {
      // TODO: ez deprecated, ki kell cserélni, ha updatelik a doksit
      fetchMore({
        variables: {
          limit: 5,
          next: quotes.value.next
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            quotes: {
              ...previousResult.quotes,
              hasNext: fetchMoreResult.quotes.hasNext,
              next: fetchMoreResult.quotes.next,
              results: [
                ...previousResult.quotes.results,
                ...fetchMoreResult.quotes.results
              ]
            }
          }
        }
      })
    }

    subscribeToMore(() => ({
      document: quoteCreatedSubscription,
      updateQuery: (previousResult, { subscriptionData }) => {
        previousResult.quotes.results.unshift(subscriptionData.data.quoteCreated)
        return previousResult
      }
    }))

    return { quotes, quotesLoading, loadMore }
  }
}
</script>
