<template>
  <div class="typography demo-content">
    <h1>Typography</h1>
    <ul>
      <li v-for="(sample, index) in samples" :key="index">
        <code>{{ sample.replace(/\_/gi, ' ') }}</code>
        <p class="typography-sample" :class="sample.replace(/\_/gi, '-')">
          <span v-if="['heading', 'display', 'supporting'].indexOf(sample.split('_')[0]) >= 0">{{ text }}</span>
          <span v-if="['heading', 'display', 'supporting'].indexOf(sample.split('_')[0]) < 0">{{ paragraph }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'STypography',
  props: {
    samples: Array,
    text: String,
    paragraph: String
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
