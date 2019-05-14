<template>
  <nav class="rpl-pagination" :aria-label="label">
    <ol class="rpl-pagination__list">
      <li v-for="n in visibleStepRange" :aria-current="n === currentStep ? 'page' : false" :aria-disabled="n === currentStep ? 'true' : false" :key="n" class="rpl-pagination__list-item">
        <button
          @click="gotoStep(n)"
          class="rpl-pagination__step"
          :class="{'rpl-pagination__step-current' : n === currentStep}"
          :disabled="n === currentStep"
          >
          <span class="rpl-pagination__step-label">{{n !== currentStep ? 'Go to ' + stepLabel : 'current ' + stepLabel}}</span>
          {{ n }}
        </button>
        <span aria-hidden="true" class="rpl-pagination__list-item-slash">/</span>
      </li>
    </ol>
    <div class="rpl-pagination__controls">
      <button v-if="currentStep > 1" @click="previousClick" class="rpl-pagination__nav">
        <span>Previous {{stepLabel}}</span>
        <rpl-icon symbol="left" color="primary" size="1.6" />
      </button>
      <button v-if="totalSteps" :disabled="currentStep === totalSteps" @click="nextClick" class="rpl-pagination__nav">
        <span>Next {{stepLabel}}</span>
        <rpl-icon symbol="right" :color="currentStep < totalSteps ? 'primary' : 'mid_neutral_1'" size="1.6" />
      </button>
    </div>
  </nav>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplPagination',
  props: {
    label: {
      type: String,
      default: 'Search'
    },
    stepLabel: {
      type: String,
      default: 'page'
    },
    totalSteps: Number,
    initialStep: { type: Number, default: 1 },
    stepsAround: { type: Number, default: 2 }
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
      this.gotoStep(this.currentStep < this.totalSteps ? this.currentStep + 1 : this.totalSteps)
    },
    previousClick () {
      this.gotoStep(this.currentStep > 1 ? this.currentStep - 1 : 1)
    },
    gotoStep (n) {
      this.currentStep = n
      this.$emit('change', this.currentStep)
    }
  },
  computed: {
    visibleStepRange () {
      // Returns Array or Number of visible steps.
      const visibleCount = (this.stepsAround * 2) + 1
      if (this.totalSteps > visibleCount) {
        if (this.currentStep >= (this.stepsAround + 1)) {
          // Set start offset (e.g. -2 from current pos). Smaller number if near end of range.
          const start = (-visibleCount + 1) + Math.min((this.totalSteps - this.currentStep), this.stepsAround)
          let rtn = []
          let count = 0
          // Render the visible steps.
          while (count < visibleCount) {
            let nextStep = this.currentStep + (start + count++)
            if (nextStep > this.totalSteps) {
              break
            }
            rtn.push(nextStep)
          }
          return rtn
        } else {
          return visibleCount
        }
      }
      return this.totalSteps
    }
  },
  watch: {
    initialStep (newVal, oldVal) {
      this.currentStep = newVal
    },
    totalSteps (newVal, oldVal) {
      this.currentStep = 1
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-pagination-step-ruleset: (
    'xs': ('l', 1.2em, 'bold')
  ) !default;
  $rpl-pagination-list-item-padding: 0 0 0 $rpl-space-2 !default;
  $rpl-pagination-list-item-divider-color: rpl-color('mid_neutral_1') !default;
  $rpl-pagination-step-color: rpl-color('extra_dark_neutral') !default;
  $rpl-pagination-step-border-bottom: 2px solid transparent !default;
  $rpl-pagination-step-hover-color: rpl-color('secondary') !default;
  $rpl-pagination-step-hover-border-bottom: 2px solid rpl-color('secondary') !default;
  $rpl-pagination-step-current-color: rpl-color('secondary') !default;
  $rpl-pagination-step-current-border-bottom: 2px solid rpl-color('secondary') !default;
  $rpl-pagination-nav-margin: 0 0 0 ($rpl-space * 6) !default;

  .rpl-pagination {
    display: flex;
    align-items: center;
    width: 100%;

    @include rpl_print_hidden;

    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__list-item {
      display: inline-block;
      padding: $rpl-pagination-list-item-padding;

      &-slash {
        @include rpl_typography_ruleset($rpl-pagination-step-ruleset);
        color: $rpl-pagination-list-item-divider-color;
        padding-left: $rpl-space-2;
        padding-right: $rpl-space;
      }

      &:last-child {
        .rpl-pagination__list-item-slash {
          display: none;
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
      color: $rpl-pagination-step-color;
      cursor: pointer;
      border-bottom: $rpl-pagination-step-border-bottom;

      &:hover,
      &:focus {
        color: $rpl-pagination-step-hover-color;
        border-bottom: $rpl-pagination-step-border-bottom;
      }

      span {
        @include rpl_visually_hidden;
      }
    }

    &__step-current {
      color: $rpl-pagination-step-current-color;
      border-bottom: $rpl-pagination-step-current-border-bottom;
      display: inline-block;

      &-label {
        @include rpl_visually_hidden;
      }

    }

    &__controls {
      margin-left: auto;
      margin-right: 0;
    }

    &__nav {
      background: transparent;
      border: 0;
      padding: 0;
      margin: $rpl-pagination-nav-margin;
      cursor: pointer;
      span {
        @include rpl_visually_hidden;
      }
    }
  }
</style>
