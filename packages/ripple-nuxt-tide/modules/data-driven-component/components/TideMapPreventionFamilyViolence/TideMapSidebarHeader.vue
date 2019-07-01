<template>
  <div class="tide-map-sidebar-header">
    <div class="tide-map-sidebar-header__ribbon"></div>
    <div class="tide-map-sidebar-header__content">
      <a v-if="showBackButton || showHomeButton" class="tide-map-sidebar-header__btn" v-on:click="clickBack">
        <rpl-text-label
          text="Back"
          iconColor="primary"
          theme="dark"
          :underline="true"
          size="small"
        >Back</rpl-text-label>
      </a>
      <h1>{{title}}</h1>
      <p>{{description}}</p>
      <a v-if="showViewAllButton" class="tide-map-sidebar-header__btn" v-on:click="clickViewAll">
        <rpl-text-label
          iconColor="primary"
          theme="dark"
          :underline="true"
          size="small"
        >View all projects</rpl-text-label>
      </a>
    </div>
  </div>
</template>

<script>
import { RplTextLabel } from '@dpc-sdp/ripple-link'

export default {
  name: 'TideMapSidebarHeader',
  components: {
    RplTextLabel
  },
  props: {
    title: String,
    description: String,
    showBackButton: Boolean,
    showHomeButton: Boolean
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

.tide-map-sidebar-header {
  background-color: rpl-color('extra_dark_neutral');
  .tide-map-sidebar-header__ribbon {
    height: $rpl-space;
    background-color: rpl-color('primary');
  }
  .tide-map-sidebar-header__content {
    padding: $rpl-space-2;
    padding-left: $rpl-space-4;
    padding-right: $rpl-space-4;
    color: rpl-color('white');
    .tide-map-sidebar-header__btn {
      // This is to make the button click hitbox to only be as big as the content
      display: inline-block;
      cursor: pointer;
    }
    h1 {
      @include rpl_typography_ruleset(('l', 1.2em, 'bold'));
      color: rpl_color('white');
      margin-bottom: 0px;
    }
    p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
}
</style>
