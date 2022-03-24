<script lang="ts">
export default {
  name: 'RplTrackTest'
}
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { getCurrentInstance } from 'vue'

import RplButton from '../button/index.vue'
import RplEventBusPlugin from '../../../plugins/eventbus'

const instance = getCurrentInstance()
RplEventBusPlugin.install(instance.appContext)
const { track } =
  getCurrentInstance().appContext.config.globalProperties.$eventbus

defineProps({
  theme: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
  }
})
</script>

<template>
  <div :className="`rpl-ui-trackable rpl-ui-trackable--${theme}`">
    <button @click="track($options.name, 'button', 'click')">click</button>
    <br />
    <rpl-button
      label="test"
      @click="track($options.name, 'rpl-button', 'click')"
    ></rpl-button>
  </div>
</template>

<style></style>
