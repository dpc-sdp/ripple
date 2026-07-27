<template>
  <div class="rpl-page-action rpl-u-screen-only">
    <div v-if="$slots.upper" class="rpl-page-action__upper">
      <slot name="upper" />
    </div>
    <slot></slot>
  </div>
</template>

<style src="@dpc-sdp/ripple-ui-styles/components/page-action/RplPageAction.css" />
