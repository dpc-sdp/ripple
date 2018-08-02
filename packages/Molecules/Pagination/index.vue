<template>
  <div class="rpl-pagination">
    <ol class="rpl-pagination__list">
      <li v-for="n in steps" :key="n" class="rpl-pagination__list-item">
        <button v-if="n !== currentStep" @click="gotoStep(n)" class="rpl-pagination__step"><span>Go to step </span>{{ n }}</button>
        <span v-else class="rpl-pagination__step-current">{{ n }}</span>
      </li>
    </ol>
    <div class="rpl-pagination__controls">
      <button v-if="currentStep > 1" @click="previousClick" class="rpl-pagination__nav">
        <span>Previous</span>
        <rpl-icon symbol="left" color="primary" size="1.6" />
      </button>
      <button v-if="currentStep < steps" @click="nextClick" class="rpl-pagination__nav">
        <span>Next</span>
        <rpl-icon symbol="right" color="primary" size="1.6" />
      </button>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplPagination',
  props: {
    steps: Number,
    initialStep: { type: Number, default: 1 }
  },
  components: {
    RplIcon
  },
  data: function () {
    return {
      currentStep: this.initialStep
    }
  },
  methods: {
    nextClick () {
      this.gotoStep(this.currentStep < this.steps ? this.currentStep + 1 : this.steps)
    },
    previousClick () {
      this.gotoStep(this.currentStep > 1 ? this.currentStep - 1 : 1)
    },
    gotoStep (n) {
      this.currentStep = n
      this.$emit('change', this.currentStep)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-pagination-step-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-pagination-step-divider-ruleset: ('l', 1.2em, 'medium') !default;

  .rpl-pagination {
    display: flex;
    width: 100%;

    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__list-item {
      display: inline-block;
      padding: 0 0 0 $rpl-space-3;

      @include rpl-breakpoint('s') {
        padding: 0 0 0 $rpl-space;
      }

      &::after {
        @include rpl_typography_ruleset($rpl-pagination-step-divider-ruleset);
        content: '/';
        color: rpl-color('mid_neutral_1');
        padding: 0 0 0 $rpl-space-3;

        @include rpl-breakpoint('s') {
          padding: 0 0 0 $rpl-space;
        }
      }

      &:last-child {
        &::after {
          content: '';
        }
      }
    }

    &__step,
    &__step-current {
      @include rpl_typography_ruleset($rpl-pagination-step-ruleset);
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
    }

    &__step {
      color: rpl-color('primary');
      border-bottom: 1px solid rpl-color('primary');
      cursor: pointer;

      span {
        @include rpl_visually_hidden;
      }
    }

    &__step-current {
      color: rpl-color('dark_neutral');
    }

    &__controls {
      margin-left: auto;
      margin-right: 0;
    }

    &__nav {
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      cursor: pointer;
      span {
        @include rpl_visually_hidden;
      }
    }
  }
</style>
