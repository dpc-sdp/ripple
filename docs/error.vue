<template>
  <AppLayout :theme="'default'">
    <RplErrorMessage
      :title="title"
      :intro="
        is404
          ? 'Sorry, we couldn\'t find the page you were looking for.'
          : 'We have a glitch in our system.'
      "
      :link="{ url: '/', text: 'Go back home' }"
      :data-cy="`error-${props.error.statusCode}`"
    >
      <RplContent v-if="is404">
        <p>
          Have a look at the web address to make sure it was typed correctly. We
          may also have deleted this page.
        </p>
      </RplContent>
      <RplContent v-else>
        <p>
          We are aware of the issue. We appreciate your patience while we’re
          looking into it.
        </p>
      </RplContent>
    </RplErrorMessage>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  error: any
}

const props = defineProps<Props>()

const is404 = computed(() => `${props.error?.statusCode}` === '404')
const title = computed(() => (is404.value ? 'Oops!' : 'Sorry!'))
</script>
