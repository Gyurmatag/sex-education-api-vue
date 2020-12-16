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
      class="relative w-full p-2 border-b-2 rounded-lg outline-none"
      type="text"
      @focus="showFilteredItems()"
      @blur="hideFilteredItems()"
    >
    <div
      v-show="optionsShown"
      class="dropdown-content absolute p-2 border-b-2 rounded-lg outline-none bg-white"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="dropdown-item cursor-pointer"
      >
        {{ item.name || item.id || '-' }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DropdownAutoComplete',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  setup (props, context) {
    const searchFilter = ref('')
    const optionsShown = ref(false)

    function showFilteredItems () {
      this.optionsShown = true
    }

    function hideFilteredItems () {
      this.optionsShown = false
    }

    return {
      searchFilter,
      optionsShown,
      showFilteredItems,
      hideFilteredItems
    }
  },

  computed: {
    filteredItems () {
      const filtered = []
      const regOption = new RegExp(this.searchFilter, 'ig')
      for (const item of this.items) {
        if (this.searchFilter.length < 1 || item.name.match(regOption)) {
          if (filtered.length < 5) filtered.push(item)
        }
      }
      return filtered
    }
  }
}
</script>
