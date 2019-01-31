<template>
  <button class="rpl-clearform" @click="clearForm">
    <rpl-text-icon :text="schema.buttonText" symbol="cross_circle" placement="before" color="danger" size="0.833334" />
  </button>
</template>

<script>
import { abstractField } from 'vue-form-generator'
import {RplTextIcon} from '@dpc-sdp/ripple-icon'

export default {
  mixins: [abstractField],
  components: {RplTextIcon},
  methods: {
    clearForm (e) {
      e.preventDefault()
      for (let key in this.model) {
        if (typeof this.model[key] === 'object' && !Array.isArray(this.model[key]) && this.model[key] !== null) {
          // nested objects need to be initalized back to an empty object to work
          this.model[key] = {}
        } else {
          this.model[key] = null
        }
      }
      this.vfg.clearValidationErrors()
    }
  }

}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-clearform-typography-emphasis: ('s', 1.6em, 'bold') !default;
$rpl-clearform-padding: $rpl-space-2;

.rpl-clearform {
  padding: $rpl-clearform-padding;
  border: 0;
  background: none;
  cursor: pointer;

  &:active {
    color: currentColor;
  }

  @include rpl_typography_ruleset($rpl-clearform-typography-emphasis);

  .rpl-icon {
    vertical-align: -4px; /* fix icon alignment */
  }
}

</style>
