<template>
  <div>This is custom template if needed</div>
</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'
export default {
  extends: RplButton,
  name: 'MyButton',
  created: function () {
    console.log('This works.')
  }
}
</script>
