<template>
  <div class="tide-map-project-card" v-on:click="cardClicked">
    <tideMapCard :item="project">
      <ul>
        <li v-for="(category, index) in project.categories" :key="index">
          <a>{{category.title}}</a>
        </li>
      </ul>
    </tideMapCard>
  </div>
</template>

<script>
import TideMapCard from './TideMapCard'

export default {
  name: 'TideMapProjectCard',
  props: {
    project: Object
  },
  components: {
    TideMapCard
  },
  methods: {
    cardClicked () {
      this.$emit('item-clicked', this.project)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$tide-map-label-background-color: rpl-color('mid_neutral_2') !default;
$tide-map-label-ruleset: ('xs', 1.4em, 'regular') !default;
.tide-map-project-card {
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  li {
    float: left;
    a {
      @include rpl_typography_ruleset($tide-map-label-ruleset);
      display: block;
      text-align: center;
      margin-right: 5px;
      margin-top: 5px;
      padding-left: 5px;
      padding-right: 5px;
      text-decoration: none;
      background-color: $tide-map-label-background-color;
    }
  }
}
</style>
