<template>
  <div class="rpl-search-form__field">
    <label>
      <span class="rpl-search-form__label-text">{{ placeholder }}</span>
      <input v-model="searchInput" ref="searchinput" class="rpl-search-form__input" type="text" :placeholder="placeholder" @keypress.enter="submitSearch()" />
    </label>
    <button @click="submitSearch()" class="rpl-search-form__btn">
      <span class="rpl-visually-hidden">{{ buttonLabel }}</span>
      <rpl-icon symbol="search" :color="'primary'" size="l"></rpl-icon>
    </button>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
export default {
  components: {
    RplIcon
  },
  data () {
    return {
      searchInput: ''
    }
  },
  props: {
    placeholder: String,
    buttonLabel: {
      type: String,
      default: 'Search'
    }
  },
  methods: {
    submitSearch () {
      this.$emit('submit-search', this.searchInput)
    }
  }
}
</script>
