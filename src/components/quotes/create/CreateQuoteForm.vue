<template>
  <div class="flex flex-col items-center mb-8 space-y-8 rounded">
    <div class="flex w-full justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('quote.create.title') }}
    </div>
    <div class="w-full max-w-xl p-5 bg-gray-800">
      <form @submit.prevent="onSubmit">
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="quoteText"
          >{{ $t('quote.create.quoteText') }}</label>
          <input
            id="quoteText"
            v-model="vv.quoteText.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="quoteText"
            :class="{ 'ring-4 ring-red-600': vv.quoteText.$error }"
          >
          <div
            v-if="vv.quoteText.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.quoteText?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <dropdown-auto-complete
            id="character"
            v-model="vv.character.name.$model"
            :items="availableCharacters"
            :input-class="'relative w-full p-2 border-b-2 rounded-lg outline-none'"
            :input-error-class="{ 'ring-4 ring-red-600': vv.character?.name?.$error }"
            @selected="onCharacterSelected"
          />
          <div
            v-if="vv.character?.name?.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.character?.name?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class="p-2 rounded-lg text-white font-bold bg-primary disabled:opacity-50 disabled:cursor-default"
            :disabled="vv.$invalid || createQuoteLoading"
          >
            {{ $t('common.submit') }}
          </button>
        </div>
        <div
          v-if="createQuoteError"
          class="flex justify-start text-md text-white"
        >
          {{ $t('quote.create.error.createQuoteRequest') }}: {{ createQuoteError.message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, toRef } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import createQuoteMutation from '@/graphql/mutations/remote/createQuote.mutation.gql'
import router from '@/router'
import DropdownAutoComplete from '@/components/shared/DropdownAutoComplete'
import characterQuery from '@/graphql/queries/remote/characters.query.gql'

export default {
  name: 'CreateQuoteForm',

  components: {
    DropdownAutoComplete
  },

  setup () {
    const newQuoteForm = reactive({
      quoteText: '',
      character: {
        name: '',
        id: ''
      }
    })
    const rules = {
      quoteText: { required },
      character: {
        name: { required }
      }
    }

    const vv = useVuelidate(rules, {
      quoteText: toRef(newQuoteForm, 'quoteText'),
      character: {
        name: toRef(newQuoteForm.character, 'name')
      }
    })

    const {
      mutate: createQuote,
      loading: createQuoteLoading,
      error: createQuoteError,
      onDone: createQuoteDone
    } = useMutation(createQuoteMutation, () => ({
      variables: {
        text: newQuoteForm.quoteText,
        character: newQuoteForm.character.id
      }
    }))

    const onSubmit = () => {
      vv.value.$touch()
      if (vv.value.$invalid) return
      createQuote()
    }

    function onCharacterSelected (option) {
      newQuoteForm.character.id = option.id
    }

    createQuoteDone(_ => {
      router.push('/dashboard')
    })

    const { result: characterResult, loading: characterLoading } =
      useQuery(characterQuery, {
        skip: 0,
        limit: 5,
        characterFilters: {
          name: toRef(newQuoteForm.character, 'name') || null
        }
      })
    const availableCharacters = useResult(characterResult, [], data => data.characters)

    return { vv, onSubmit, createQuoteLoading, createQuoteError, availableCharacters, onCharacterSelected, characterLoading }
  }
}
</script>
