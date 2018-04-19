<template>
  <div class="typography">
    <ul>
      <li v-for="(sample, index) in samples" :key="index">
        <code>{{ sample }}</code>
        <p class="typography-sample" :class="sample.replace(/\_/gi, '-')">
          <span v-if="['heading', 'display'].indexOf(sample.split('_')[0]) >= 0">The quick brown fox jumps over the lazy dog</span>
          <span v-if="['heading', 'display'].indexOf(sample.split('_')[0]) < 0">Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae quod nobis earum saepe inventore rerum dicta voluptatem ullam iste rem deleniti odit culpa tempora dolor animi, non, amet ducimus.</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'STypography',
  props: [],
  data: function() {
    return {
      samples: [
        'display_xl',
        'display_l',
        'heading_xl',
        'heading_l',
        'heading_m',
        'heading_s',
        'heading_xs',
        'body_default',
        'body_small',
        'copy_extra_small'
      ]
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

.typography-sample {
  margin: 1rem 0;
}

.display-xl {
  @include rpl_display_xl;
}

.display-l {
  @include rpl_display_l;
}

.heading-xl {
  @include rpl_heading_xl;
}

.heading-l {
  @include rpl_heading_l;
}

.heading-m {
  @include rpl_heading_m;
}

.heading-s {
  @include rpl_heading_s;
}

.heading-xs {
  @include rpl_heading_xs;
}

.body-default {
  @include rpl_body_default;
}

.body-small {
  @include rpl_body_small;
}

.copy-extra-small {
  @include rpl_copy_extra_small;
}
</style>
