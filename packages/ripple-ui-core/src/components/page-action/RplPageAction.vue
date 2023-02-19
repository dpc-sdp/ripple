<template>
  <div class="rpl-page-action">
    <div v-if="$slots.upper" class="rpl-page-action__upper">
      <slot name="upper" />
    </div>
    <slot></slot>
  </div>
</template>

<style src="./RplPageAction.css" />
