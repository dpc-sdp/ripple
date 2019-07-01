<template>
  <div class="tide-map-project-card" v-on:click="cardClicked">
    <tideMapCard :item="project">
      <ul>
        <li v-for="(category, index) in project.categories" :key="index">
          <span>{{category.title}}</span>
        </li>
      </ul>
    </tideMapCard>
  </div>
</template>

<script>
import TideMapCard from './TideMapCard'

export default {
  name: 'TideMapProjectCard',
  components: {
    TideMapCard
  },
  props: {
    project: Object
  },
  methods: {
    cardClicked () {
      this.$emit('click', this.project)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

.tide-map-project-card {
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  li {
    float: left;
    span {
      @include rpl_typography_ruleset(('xs', 1.4em, 'regular'));
      display: block;
      text-align: center;
      margin-right: $rpl-space;
      margin-top: $rpl-space;
      padding-left: $rpl-space;
      padding-right: $rpl-space;
      background-color: rpl-color('mid_neutral_2');
    }
  }
}
</style>
