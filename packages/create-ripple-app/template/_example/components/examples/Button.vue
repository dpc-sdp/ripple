<template>
  <!-- Override the template if need-->
  <button class="example-button"><slot></slot></button>
</template>

<script>
// Extend Ripple component if need. https://vuejs.org/v2/api/#extends
// Please be careful as extending will introduce complexity in maintenance.
import RplButton from '@dpc-sdp/ripple-button'

export default {
  extends: RplButton,
  name: 'ExampleButton',
  created: function () {
    console.log('Extending works.')
  }
}
</script>
