<script lang="ts" setup>
interface Props {
  title: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: ''
})
</script>

<template>
  <div class="root">
    <div class="rpl-container">
      <div class="rpl-grid">
        <div class="rpl-col-12 rpl-col-7-m">
          <h1 class="rpl-type-h1 rpl-u-margin-b-4">
            {{ title }}
          </h1>
          <p class="rpl-type-p-large">{{ description }}</p>
        </div>
        <div class="rpl-col-4 rpl-col-start-9 image">
          <img src="/img/ripple-logo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';
.root {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);

  padding-top: var(--rpl-sp-8);
  padding-bottom: var(--rpl-sp-8);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-10);
    padding-bottom: var(--rpl-sp-10);
  }

  @media (--rpl-bp-l) {
    padding-top: var(--rpl-sp-12);
    padding-bottom: var(--rpl-sp-12);
  }

  @media (--rpl-bp-xl) {
    padding-top: var(--rpl-sp-13);
    padding-bottom: var(--rpl-sp-13);
  }
}
.image {
  align-items: center;
  justify-content: center;

  display: none;

  @media (--rpl-bp-m) {
    display: flex;
  }
}
</style>
