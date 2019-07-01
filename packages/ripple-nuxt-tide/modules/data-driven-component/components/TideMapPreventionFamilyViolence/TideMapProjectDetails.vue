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
      @click="itemClicked"
    />
    <h3>{{deliveredHeader}}</h3>
    <tideMapCard
      v-for="(area, index) in project.areas"
      :key="'a' + index"
      :isArea="true"
      :item="area"
      @click="itemClicked"
    />
    <rpl-button class="tide-map-project-details__more-btn" theme="primary" :href="project.href">Find out more</rpl-button>
  </div>
</template>

<script>
import TideMapCard from './TideMapCard'
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'TideMapProjectDetails',
  components: {
    RplButton,
    TideMapCard
  },
  props: {
    project: Object
  },
  methods: {
    itemClicked (item) {
      this.$emit('click', item)
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

.tide-map-project-details {
  .tide-map-project-details__more-btn.rpl-button {
    margin-top: $rpl-space-2;
    width: 100%;
  }
  h3 {
    @include rpl_typography_ruleset(('xs', 1.4em, 'bold'));
    color: rpl_color('extra_dark_neutral');
    margin:  0 0 $rpl-space-3 0;
  }
  p {
    @include rpl_typography_ruleset(('xs', 1.4em, 'regular'));
    color: rpl_color('extra_dark_neutral');
    margin: $rpl-space-2 0;
  }
}
</style>
