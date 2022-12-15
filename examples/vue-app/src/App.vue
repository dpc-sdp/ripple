<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RplLayout } from '@dpc-sdp/ripple-ui-core'
import '@dpc-sdp/ripple-ui-core/style'
import '@dpc-sdp/ripple-ui-core/style/components'
</script>

<template>
  <RplLayout>
    <template #aboveHeader>
      <header class="rpl-container">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />
        <div class="wrapper">
          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>
    </template>
    <template #body> <RouterView /></template>
  </RplLayout>
</template>

<style>
header {
  display: flex;
  align-items: center;
}
nav > a {
  font-size: var(--rpl-type-size-4);
  padding: var(--rpl-sp-3);
}
</style>
