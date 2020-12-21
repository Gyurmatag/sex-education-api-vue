<template>
  <div
    v-if="items"
    class="dropdown"
  >
    <label
      class="dropdown-input block mb-2 text-white"
      for="autoCompleteInput"
    >{{ $t('quote.create.character') }}</label>
    <input
      id="autoCompleteInput"
      v-model="searchFilter"
      :class="[inputClass, inputErrorClass]"
      type="text"
      @focus="showFilteredItems()"
      @blur="hideFilteredItems()"
    >
    <div
      v-show="optionsShown"
      class="dropdown-content absolute p-2 border-b-2 rounded-lg outline-none bg-white"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="dropdown-item cursor-pointer"
        @mousedown="selectItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import { useModelWrapper } from '@/utils/modelWrapper'

export default {
  name: 'DropdownAutoComplete',

  props: {
    items: {
      type: Array,
      required: true
    },
    modelValue: String,
    inputClass: {
      type: String,
      required: false,
      default: ''
    },
    inputErrorClass: {
      type: Object,
      required: false,
      default: null
    }
  },

  emits: ['update:modelValue', 'selected'],

  setup (props, { emit }) {
    const optionsShown = ref(false)

    function showFilteredItems () {
      this.optionsShown = true
    }

    function hideFilteredItems () {
      this.optionsShown = false
    }

    function selectItem (item) {
      this.optionsShown = false
      this.searchFilter = item.name
      emit('selected', item)
    }

    return {
      searchFilter: useModelWrapper(props, emit, 'modelValue'),
      optionsShown,
      showFilteredItems,
      hideFilteredItems,
      selectItem
    }
  }
}
</script>
