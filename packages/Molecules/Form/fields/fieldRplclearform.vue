<template>
  <button class="rpl-clearform" @click="handleClearButtonEvent">
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
    clearForm (e, model, vfg) {
      e.preventDefault()
      for (let key in model) {
        if (Array.isArray(model[key])) {
          model[key] = []
        } else if (typeof model[key] === 'object' && model[key] !== null) {
          // nested objects need to be initalized back to an empty object to work
          model[key] = {}
        } else {
          model[key] = null
        }
      }
      if (vfg.errors && vfg.errors.length > 0) {
        vfg.clearValidationErrors()
      }
    },
    handleClearButtonEvent (e) {
      this.clearForm(e, this.model, this.vfg)
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
  padding: $rpl-clearform-padding 0;
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
