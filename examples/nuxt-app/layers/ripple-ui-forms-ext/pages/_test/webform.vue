<template>
  <TideLandingPage :site="site as any" :page="page as any">
    <template #sidebar> </template>
  </TideLandingPage>
</template>

<script setup lang="ts">
import page from '../../__test__/fixtures/webform.json'
import { useTideSite } from '#imports'

const site = await useTideSite()
</script>
