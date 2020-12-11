<template>
  <div class="flex flex-col mb-8 space-y-8 rounded">
    <div class="flex justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('character.create.title') }}
    </div>
    <div class="w-full max-w-xl m-auto p-5 bg-gray-800">
      <form @submit.prevent="onSubmit">
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="name"
          >{{ $t('character.create.name') }}</label>
          <input
            id="name"
            v-model="vv.name.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="name"
            :class="{ 'ring-4 ring-red-600': vv.name.$error }"
          >
          <div
            v-if="vv.name.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.name?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="name"
          >{{ $t('character.create.image') }}</label>
          <input
            id="image"
            v-model="vv.imageUrl.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="image"
            :class="{ 'ring-4 ring-red-600': vv.imageUrl.$error }"
          >
          <div
            v-if="vv.imageUrl.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.imageUrl?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-20">
          <label
            class="block mb-2 text-white"
          >{{ $t('character.create.gender') }}</label>
          <div class="flex space-x-6">
            <div class="flex items-center space-x-2">
              <input
                id="male"
                v-model="vv.gender.$model"
                value="MALE"
                class="h-4 w-4 border-b-2 rounded-lg outline-none"
                type="radio"
                name="name"
                :class="{ 'ring-4 ring-red-600': vv.imageUrl.$error }"
              >
              <label
                for="male"
                class="text-white"
              >{{ $t('character.common.gender.MALE') }}</label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                id="female"
                v-model="vv.gender.$model"
                value="FEMALE"
                class="h-4 w-4 border-b-2 rounded-lg outline-none"
                type="radio"
                name="name"
                :class="{ 'ring-4 ring-red-600': vv.gender.$error }"
              >
              <label
                for="female"
                class="text-white"
              >{{ $t('character.common.gender.FEMALE') }}</label>
            </div>
          </div>
          <div
            v-if="vv.gender.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.gender?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
          >{{ $t('character.create.season') }}</label>
          <div
            v-for="availableSeason in availableSeasons"
            :key="availableSeason.id"
            class="flex items-center space-x-3"
          >
            <input
              :id="`season${availableSeason.id}`"
              v-model="vv.seasons.$model"
              :value="availableSeason.id"
              class="h-4 w-4 border-b-2"
              type="checkbox"
            >
            <label
              class="text-white"
              :for="`season${availableSeason.id}`"
            >
              {{ $t('character.common.season', { seasonNumber: availableSeason.number }) }}
            </label>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class="p-2 rounded-lg text-white font-bold bg-primary disabled:opacity-50 disabled:cursor-default"
            :disabled="vv.$invalid || createCharacterLoading"
          >
            {{ $t('common.submit') }}
          </button>
        </div>
        <div
          v-if="createCharacterError"
          class="flex justify-start text-md text-white"
        >
          {{ $t('character.create.error.createCharacterRequest') }}: {{ createCharacterError.message }}
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

import createCharacterMutation from '@/graphql/mutations/createCharacter.mutation.gql'
import router from '@/router'
import seasonsQuery from '@/graphql/queries/seasons.query.gql'

export default {
  name: 'CreateCharacterForm',

  setup () {
    const newCharacterForm = reactive({
      name: '',
      imageUrl: '',
      gender: null,
      seasons: []
    })
    const rules = {
      name: { required },
      imageUrl: { required },
      gender: { required },
      seasons: { required }
    }

    const vv = useVuelidate(rules, {
      name: toRef(newCharacterForm, 'name'),
      imageUrl: toRef(newCharacterForm, 'imageUrl'),
      gender: toRef(newCharacterForm, 'gender'),
      seasons: toRef(newCharacterForm, 'seasons')
    })

    const {
      mutate: createCharacter,
      loading: createCharacterLoading,
      error: createCharacterError,
      onDone: createCharacterDone
    } = useMutation(createCharacterMutation, () => ({
      variables: {
        name: newCharacterForm.name,
        imageUrl: newCharacterForm.imageUrl,
        gender: newCharacterForm.gender,
        seasons: newCharacterForm.seasons
      }
    }))

    const onSubmit = () => {
      vv.value.$touch()
      if (vv.value.$invalid) return
      createCharacter()
    }

    createCharacterDone(result => {
      router.push('/dashboard')
    })

    const { result: seasonsResult, loading: seasonsLoading } = useQuery(seasonsQuery)
    const availableSeasons = useResult(seasonsResult, null, data => data.seasons)

    return { vv, onSubmit, createCharacterLoading, createCharacterError, availableSeasons, seasonsLoading }
  }
}
</script>

<style scoped>

</style>
