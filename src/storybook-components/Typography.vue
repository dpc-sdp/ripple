<template>
  <div class="typography demo-content">
    <h1>Typography</h1>
    <ul>
      <li v-for="(sample, index) in samples" :key="index">
        <code>{{ sample.replace(/\_/gi, ' ') }}</code>
        <p class="typography-sample" :class="sample.replace(/\_/gi, '-')">
          <span v-if="['heading', 'display', 'supporting'].indexOf(sample.split('_')[0]) >= 0">The quick brown fox jumps over the lazy dog</span>
          <span v-if="['heading', 'display', 'supporting'].indexOf(sample.split('_')[0]) < 0">Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae quod nobis earum saepe inventore rerum dicta voluptatem ullam iste rem deleniti odit culpa tempora dolor animi, non, amet ducimus.</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'STypography',
  props: {
    'samples': Array
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

@each $type-name, $type-value in $rpl-typography {
  .#{str-replace($type-name, '_', '-')} {
    @include rpl_typography($type-name);
  }
}
</style>
