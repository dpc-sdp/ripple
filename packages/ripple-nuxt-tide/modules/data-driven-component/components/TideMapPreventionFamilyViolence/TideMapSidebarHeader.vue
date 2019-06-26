<template>
  <div class="tide-map-header">
    <div class="tide-map-header-ribbon"></div>
    <div class="tide-map-header-content">
      <div v-if="showBackButton || showHomeButton" class="btn-container" v-on:click="clickBack">
        <rpl-text-link
          text="Back"
          url
          iconColor="primary"
          theme="dark"
          :underline="true"
          size="small"
        />
      </div>
      <h1>{{title}}</h1>
      <p>{{description}}</p>
      <div v-if="showViewAllButton" class="btn-container" v-on:click="clickViewAll">
        <rpl-text-link
          text="View all projects"
          url
          iconColor="primary"
          theme="dark"
          :underline="true"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'

export default {
  name: 'TideMapSidebarHeader',
  props: {
    title: String,
    description: String,
    showBackButton: Boolean,
    showHomeButton: Boolean
  },
  components: {
    RplTextLink
  },
  computed: {
    showViewAllButton () {
      return !this.showBackButton && !this.showHomeButton
    }
  },
  methods: {
    clickBack () {
      if (this.showBackButton) {
        this.$emit('back-clicked')
      }

      if (this.showHomeButton) {
        this.$emit('home-clicked')
      }
    },
    clickViewAll () {
      this.$emit('view-all-clicked')
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$tide-map-header-ribbon-background-color: rpl-color('primary') !default;
$tide-map-header-content-background-color: rpl-color(
  'extra_dark_neutral'
) !default;
$tide-map-header-content-text-color: rpl-color('white') !default;

$tide-map-header-title-ruleset: ('l', 1.2em, 'bold') !default;
$tide-map-header-title-text-color: rpl_color('white') !default;

$tide-map-header-padding: $rpl-space-2 !default;

.tide-map-header {
  background-color: $tide-map-header-content-background-color;
  .tide-map-header-ribbon {
    height: 6px;
    background-color: $tide-map-header-ribbon-background-color;
  }
  .tide-map-header-content {
    padding: $tide-map-header-padding;
    padding-left: 20px;
    padding-right: 20px;
    color: $tide-map-header-content-text-color;
    .btn-container {
      // This is to make the button click hitbox to only be as big as the content
      display: inline-block;
    }
    h1 {
      @include rpl_typography_ruleset($tide-map-header-title-ruleset);
      color: $tide-map-header-title-text-color;
      margin-bottom: 0px;
    }
    p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
}
</style>
