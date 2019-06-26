<template>
  <div>
    <div class="menu">
      <rpl-text-link class="header-btn" :text="`Browse by ${isArea ? 'area' : 'category'}`" url size="small" emphasis/>
      <div class="other-btn" v-on:click="clickShowOther">
        <rpl-text-link
          :text="`Browse by ${isArea ? 'category' : 'area'}`"
          url
          iconColor="primary"
          :underline="true"
          size="small"
          emphasis
        />
      </div>
    </div>
    <tideMapCard
      v-for="(item, index) in items"
      v-on:item-clicked="setCategory"
      :key="index"
      :isArea="isArea"
      :item="item"
    />
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import TideMapCard from './TideMapCard'

export default {
  name: 'TideMapCategoriesPage',
  props: {
    items: Array,
    isArea: Boolean
  },
  methods: {
    clickShowOther () {
      if (this.isArea) {
        this.$emit('clickShowCategories')
      } else {
        this.$emit('clickShowArea')
      }
    },
    setCategory (cat) {
      this.$emit('clickCategory', cat)
    }
  },
  components: {
    RplTextLink,
    TideMapCard
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$tide-map-sidebar-other-btn-color: rpl-color('secondary') !default;
$tide-map-sidebar-header-btn-color: rpl-color('extra_dark_neutral') !default;
.menu {
  display: flex;
  .header-btn {
    &:hover, &:focus {
      color: $tide-map-sidebar-header-btn-color;
      text-decoration: none;
      outline: none;
      cursor: default;
    }
  }
  .other-btn {
    .rpl-text-label {
      border-bottom-color: $tide-map-sidebar-other-btn-color !important;
    }
    // This makes the area button float right
    margin-left: auto;
    margin-right: 5px;
    order: 2;
  }
}

</style>
