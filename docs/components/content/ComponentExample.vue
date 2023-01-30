<template>
  <div class="my-8 docs-component-example flex content-center rounded-md w-full" :class="{ [`theme-${theme}`]: theme }">
    <div class="docs-component-example__inner m-auto p-4 space-x-4" :class="innerClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String
  }
})
const innerClasses = props.fullWidth
  ? ['block', 'w-full']
  : ['flex', 'flex-row']
</script>

<style scoped>
.docs-component-example {
  background: repeating-conic-gradient(#eee 0% 25%, transparent 0% 50%) 50% / 20px 20px;
  font-family: var(--rpl-type-font-family) !important;
}

.theme-dark {
  --rpl-clr-primary: purple;
  --rpl-clr-primary-alt: #a21e8f;
  --rpl-clr-accent: #ef4a81;
  --rpl-clr-accent-alt: #fdedf2;
  --rpl-clr-link: #be3c67;
  --rpl-clr-focus: #1c3bdd;
  --rpl-clr-type-focus-contrast: var(--rpl-clr-light);
}

.theme-light {
  --rpl-clr-primary: #fdda24;
  --rpl-clr-primary-alt: #fef0a7;
  --rpl-clr-primary-alpha: rgb(253 218 36 / .5);
  --rpl-clr-accent: #ef4a81;
  --rpl-clr-accent-alt: #fdedf2;
  --rpl-clr-link: #86be3c;
  --rpl-clr-focus: #1c3bdd;
  --rpl-clr-type-focus-contrast: var(--rpl-clr-light);
  --rpl-clr-gradient-vertical: linear-gradient(90deg, var(--rpl-clr-accent) 0%, var(--rpl-clr-accent) 100%);
  --rpl-clr-gradient-horizontal: linear-gradient(90deg, var(--rpl-clr-accent) 0%, var(--rpl-clr-accent) 100%);
  --rpl-clr-type-primary-contrast: var(--rpl-clr-dark);
  --rpl-clr-type-primary-contrast-alpha: rgb(26 26 26 / 0.75);
  --rpl-clr-type-accent-contrast: var(--rpl-clr-dark);
  --rpl-clr-type-primary-accessible: var(--rpl-clr-type-default);
  --rpl-clr-type-primary-alt-accessible: var(--rpl-clr-type-default);
}
</style>
