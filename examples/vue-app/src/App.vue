<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RplButton } from '@dpc-sdp/ripple-ui-core'
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <RplButton theme="primary">RPL Button</RplButton>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
