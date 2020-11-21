<template>
  <div class="lg:flex w:11/12 sm:w-3/4 md:w-3/4 lg:w-2/5 xl:w-1/4 sm:m-4 mx-4 mt-4 bg-gray-800 rounded-lg shadow-lg">
    <img
      :src="character.imageUrl"
      alt="character_image"
      class="mx-auto lg:mx-0 lg:object-left h-48 lg:rounded-l-lg"
    >
    <div>
      <div class="text-center lg:text-left m-4 text-white">
        {{ character.name }}
      </div>
      <div class="flex justify-center lg:justify-start items-center lg:text-left m-4 text-gray-500">
        <div
          v-if="character.gender === 'MALE'"
          class="h-3 w-3 mr-2 rounded-lg bg-blue-600"
        />
        <div
          v-else
          class="h-3 w-3 mr-2 rounded-lg bg-pink-600"
        />
        <div>
          {{ $t(`character.gender.${character.gender}`) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      default: null
    }
  }
}
</script>
