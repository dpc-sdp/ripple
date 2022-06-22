<template>
  <div class="docs-component-example flex content-center rounded-md">
    <div class="m-auto p-4 flex flex-row space-x-4">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.docs-component-example {
  background: repeating-conic-gradient(#eee 0% 25%, transparent 0% 50%) 50% /
    20px 20px;
  font-family: var(--rpl-type-font-family) !important;
}
</style>
