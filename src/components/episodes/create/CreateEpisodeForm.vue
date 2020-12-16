<template>
  <div class="flex flex-col items-center mb-8 space-y-8 rounded">
    <div class="flex w-full justify-center py-5 bg-gray-800 text-xl text-white">
      {{ $t('episode.create.title') }}
    </div>
    <div class="w-full max-w-xl m-auto p-5 bg-gray-800">
      <form @submit.prevent="onSubmit">
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="number"
          >{{ $t('episode.create.number') }}</label>
          <input
            id="number"
            v-model="vv.number.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="number"
            :class="{ 'ring-4 ring-red-600': vv.number.$error }"
          >
          <div
            v-if="vv.number.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.number?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="title"
          >{{ $t('episode.create.episodeTitle') }}</label>
          <input
            id="title"
            v-model="vv.title.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="title"
            :class="{ 'ring-4 ring-red-600': vv.title.$error }"
          >
          <div
            v-if="vv.title.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.title?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="director"
          >{{ $t('episode.create.director') }}</label>
          <input
            id="director"
            v-model="vv.director.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="director"
            :class="{ 'ring-4 ring-red-600': vv.director.$error }"
          >
          <div
            v-if="vv.director.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.director?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
            for="writer"
          >{{ $t('episode.create.writer') }}</label>
          <input
            id="writer"
            v-model="vv.writer.$model"
            class="w-full p-2 border-b-2 rounded-lg outline-none"
            type="text"
            name="writer"
            :class="{ 'ring-4 ring-red-600': vv.writer.$error }"
          >
          <div
            v-if="vv.writer.$error"
            class="py-2 block text-red-600"
          >
            <span>{{ vv.writer?.$errors[0]?.$message }}</span>
          </div>
        </div>
        <div class="h-28">
          <label
            class="block mb-2 text-white"
          >{{ $t('episode.create.season') }}</label>
          <div
            v-for="availableSeason in availableSeasons"
            :key="availableSeason.id"
            class="flex items-center space-x-3"
          >
            <input
              :id="`season${availableSeason.id}`"
              v-model="vv.season.$model"
              :value="availableSeason.id"
              class="h-4 w-4 border-b-2"
              type="radio"
            >
            <label
              class="text-white"
              :for="`season${availableSeason.id}`"
            >
              {{ $t('episode.common.season', { seasonNumber: availableSeason.number }) }}
            </label>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class="p-2 rounded-lg text-white font-bold bg-primary disabled:opacity-50 disabled:cursor-default"
            :disabled="vv.$invalid || createEpisodeLoading"
          >
            {{ $t('common.submit') }}
          </button>
        </div>
        <div
          v-if="createEpisodeError"
          class="flex justify-start text-md text-white"
        >
          {{ $t('episode.create.error.createEpisodeRequest') }}: {{ createEpisodeError.message }}
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

import createEpisodeMutation from '@/graphql/mutations/remote/createEpisode.mutation.gql'
import router from '@/router'
import seasonsQuery from '@/graphql/queries/remote/seasons.query.gql'

export default {
  name: 'CreateEpisodeForm',

  setup () {
    const newEpisodeForm = reactive({
      number: null,
      title: '',
      director: '',
      writer: '',
      season: null
    })
    const rules = {
      number: { required },
      title: { required },
      director: { required },
      writer: { required },
      season: { required }
    }

    const vv = useVuelidate(rules, {
      number: toRef(newEpisodeForm, 'number'),
      title: toRef(newEpisodeForm, 'title'),
      director: toRef(newEpisodeForm, 'director'),
      writer: toRef(newEpisodeForm, 'writer'),
      season: toRef(newEpisodeForm, 'season')
    })

    const {
      mutate: createEpisode,
      loading: createEpisodeLoading,
      error: createEpisodeError,
      onDone: createEpisodeDone
    } = useMutation(createEpisodeMutation, () => ({
      variables: {
        number: +newEpisodeForm.number,
        title: newEpisodeForm.title,
        director: newEpisodeForm.director,
        writer: newEpisodeForm.writer,
        season: newEpisodeForm.season
      }
    }))

    const onSubmit = () => {
      vv.value.$touch()
      if (vv.value.$invalid) return
      createEpisode()
    }

    createEpisodeDone(result => {
      router.push('/dashboard')
    })

    const { result: seasonsResult, loading: seasonsLoading } = useQuery(seasonsQuery)
    const availableSeasons = useResult(seasonsResult, null, data => data.seasons)

    return { vv, onSubmit, createEpisodeLoading, createEpisodeError, availableSeasons, seasonsLoading }
  }
}
</script>
