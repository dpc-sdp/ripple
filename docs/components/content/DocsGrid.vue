<template>
  <div class="my-8">
    <div class="rpl-grid">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.rpl-content .rpl-grid {
  list-style: none;
  padding-left: 0;
  margin-left: 0;
}
.rpl-content .rpl-grid > li:before {
  display: none;
}
</style>
