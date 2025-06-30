<template>
  <AppLayout :theme="'default'">
    <RplErrorMessage
      title="Oops!"
      intro="Sorry, we couldn't find the page you were looking for."
      :link="{ url: '/', text: 'Go back home' }"
    >
      <RplContent>
        <p>
          Have a look at the web address to make sure it was typed correctly. We
          may also have deleted this page.
        </p>
      </RplContent>
    </RplErrorMessage>
  </AppLayout>
</template>

<script setup lang="ts">
interface Props {
  error: any
}

defineProps<Props>()
</script>
