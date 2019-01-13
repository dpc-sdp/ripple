<template>
  <button
    class="rpl-submit-loader form-control"
    :class="{ 'rpl-submit-loader--loading': schema.loading }"
    :disabled="disabled || schema.loading"
    :readonly="schema.readonly"
    type="submit"
  >
    <span class="rpl-submit-loader__text" :class="{ 'rpl-submit-loader__text--loading': schema.loading }">{{ schema.buttonText }}</span>
    <svg v-if="schema.loading" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.8 8.4C2.8 9.1728 2.1742 9.8 1.4 9.8C0.6258 9.8 0 9.1728 0 8.4V1.4C0 0.6272 0.6258 0 1.4 0C2.1742 0 2.8 0.6272 2.8 1.4V8.4Z" transform="translate(12.6)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.39011 7.33986C1.84366 7.88631 0.957652 7.8873 0.41021 7.33986C-0.137232 6.79242 -0.136242 5.90641 0.41021 5.35996L5.35996 0.41021C5.90641 -0.136242 6.79241 -0.137232 7.33986 0.41021C7.8873 0.957652 7.88631 1.84366 7.33986 2.39011L2.39011 7.33986Z" transform="translate(16.5596 3.69029)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 2.8C0.6272 2.8 0 2.1742 0 1.4C0 0.6258 0.6272 0 1.4 0H8.4C9.1728 0 9.8 0.6258 9.8 1.4C9.8 2.1742 9.1728 2.8 8.4 2.8H1.4Z" transform="translate(18.2 12.6)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33986 5.35996C7.88631 5.90641 7.8873 6.79241 7.33986 7.33986C6.79241 7.8873 5.90641 7.88631 5.35996 7.33986L0.41021 2.39011C-0.136242 1.84366 -0.137232 0.957652 0.41021 0.41021C0.957652 -0.137232 1.84366 -0.136242 2.39011 0.41021L7.33986 5.35996Z" transform="translate(16.5596 16.5596)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 2.8C0.6272 2.8 0 2.1742 0 1.4C0 0.6258 0.6272 0 1.4 0H8.4C9.1728 0 9.8 0.6258 9.8 1.4C9.8 2.1742 9.1728 2.8 8.4 2.8H1.4Z" transform="translate(12.6 28) rotate(-90)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 2.8C0.6272 2.8 0 2.1742 0 1.4C0 0.6258 0.6272 0 1.4 0H8.4C9.1728 0 9.8 0.6258 9.8 1.4C9.8 2.1742 9.1728 2.8 8.4 2.8H1.4Z" transform="translate(3.11055 22.9095) rotate(-45)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4 2.8C0.6272 2.8 0 2.1742 0 1.4C0 0.6258 0.6272 0 1.4 0H8.4C9.1728 0 9.8 0.6258 9.8 1.4C9.8 2.1742 9.1728 2.8 8.4 2.8H1.4Z" transform="translate(0 12.6)" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33986 5.35996C7.88631 5.90641 7.8873 6.79242 7.33986 7.33986C6.79242 7.8873 5.90641 7.88631 5.35996 7.33986L0.41021 2.39011C-0.136242 1.84366 -0.137232 0.957652 0.41021 0.41021C0.957652 -0.137232 1.84366 -0.136242 2.39011 0.41021L7.33986 5.35996Z" transform="translate(3.6903 3.69029)" fill="white"/>
    </svg>
  </button>
</template>

<script>
import { abstractField } from 'vue-form-generator'

export default {
  mixins: [abstractField]
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "../scss/form";

$rpl-field-submit-loader-total-duration: 2 !default;
$rpl-field-submit-loader-icon-from-color: rpl-color('white') !default;
$rpl-field-submit-loader-icon-to-color: rpl-color('secondary') !default;

@keyframes rpl-field-submit-loader-pulse-animation {
  0% {
    fill: $rpl-field-submit-loader-icon-from-color;
  }

  12.5% {
    fill: $rpl-field-submit-loader-icon-to-color;
  }

  25% {
    fill: $rpl-field-submit-loader-icon-from-color;
  }

  100% {
    fill: $rpl-field-submit-loader-icon-from-color;
  }
}

@mixin rpl_field_submit_loader_pulser($delay) {
  animation-name: rpl-field-submit-loader-pulse-animation;
  animation-iteration-count: infinite;
  animation-duration: $rpl-field-submit-loader-total-duration * 1s;
  animation-delay: (($rpl-field-submit-loader-total-duration / 8) * ($delay - 1)) * 1s;
}

.rpl-submit-loader {
  position: relative;

  &__text {
    &--loading {
      opacity: 0;
    }
  }

  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    @for $i from 1 through 8 {
      path:nth-child(#{$i}) {
        @include rpl_field_submit_loader_pulser($i);
      }
    }
  }
}

</style>
