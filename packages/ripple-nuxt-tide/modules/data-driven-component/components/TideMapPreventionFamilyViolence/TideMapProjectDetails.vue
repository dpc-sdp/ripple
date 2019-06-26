<template>
  <div class="tide-map-project-details">
    <h3>Program</h3>
    <p>{{project.program}}</p>
    <h3>Provided by</h3>
    <p>{{project.providedBy}}</p>
    <h3>Project details</h3>
    <p>{{project.details}}</p>
    <h3>{{categoriesHeader}}</h3>
    <tideMapCard
      v-for="(category, index) in project.categories"
      :key="'c' + index"
      :item="category"
      v-on:item-clicked="itemClicked"
    />
    <h3>{{deliveredHeader}}</h3>
    <tideMapCard
      v-for="(area, index) in project.areas"
      :key="'a' + index"
      :isArea="true"
      :item="area"
      v-on:item-clicked="itemClicked"
    />
    <rpl-button class="more-btn" theme="primary" :href="project.href">Find out more</rpl-button>
  </div>
</template>

<script>
import TideMapCard from './TideMapCard'
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'TideMapProjectDetails',
  props: {
    project: Object
  },
  components: {
    RplButton,
    TideMapCard
  },
  methods: {
    itemClicked (item) {
      this.$emit('item-clicked', item)
    }
  },
  computed: {
    categoriesHeader () {
      const count = this.project.categories.length
      return count === 1 ? `In ${count} category` : `In ${count} categories`
    },
    deliveredHeader () {
      const count = this.project.areas.length
      return count === 1
        ? `Delivered in ${count} area`
        : `Delivered in ${count} areas`
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$tide-map-label-background-color: rpl-color('mid_neutral_2') !default;
$tide-map-project-details-title-ruleset: ('xs', 1.4em, 'bold') !default;
$tide-map-project-details-title-text-color: rpl_color(
  'extra_dark_neutral'
) !default;
$tide-map-project-details-title-margin: 0 0 $rpl-space-3 0 !default;
$tide-map-project-details-description-ruleset: (
  'xs',
  1.4em,
  'regular'
) !default;
$tide-map-project-details-description-text-color: rpl_color(
  'extra_dark_neutral'
) !default;
$tide-map-project-details-description-margin: $rpl-space-2 0 !default;

.tide-map-project-details {
  .more-btn.rpl-button {
    margin-top: 10px;
    width: 100%;
  }
  h3 {
    @include rpl_typography_ruleset($tide-map-project-details-title-ruleset);
    color: $tide-map-project-details-title-text-color;
    margin: $tide-map-project-details-title-margin;
  }
  p {
    @include rpl_typography_ruleset(
      $tide-map-project-details-description-ruleset
    );
    color: $tide-map-project-details-description-text-color;
    margin: $tide-map-project-details-description-margin;
  }
}
</style>
