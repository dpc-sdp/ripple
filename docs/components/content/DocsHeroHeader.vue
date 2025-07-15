<script lang="ts" setup>
interface Props {
  title: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  description: ''
})
</script>

<template>
  <div class="root">
    <div class="rpl-container inner">
      <div class="rpl-grid">
        <div class="rpl-col-10 rpl-col-7-m">
          <h1 class="rpl-type-h1 rpl-u-margin-b-4">
            {{ title }}
          </h1>
          <p class="rpl-type-p-large">{{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.root {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}
.image {
  align-items: center;
  justify-content: center;

  display: none;

  @media (--rpl-bp-m) {
    display: flex;
  }
}

.root {
  background-image: url(/assets/img/hero-graphic.png);
  background-size: 449px;
  background-repeat: no-repeat;
  background-position: right -232px bottom -177px;

  @media (--rpl-bp-s) {
    background-size: 449px;
    background-position: right -232px bottom -177px;
  }

  @media (--rpl-bp-m) {
    background-size: 629px;
    background-position: right -316px bottom -122px;
  }

  @media (--rpl-bp-l) {
    background-size: 837px;
    background-position: right -413px bottom -120px;
  }

  @media (--rpl-bp-xl) {
    background-size: 840px;
    background-position: right calc(50% - 502px) bottom -160px;
  }
}

.inner {
  padding-top: var(--rpl-sp-9);
  padding-bottom: var(--rpl-sp-11);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-12);
    padding-bottom: var(--rpl-sp-13);
  }

  @media (--rpl-bp-l) {
    padding-top: var(--rpl-sp-13);
    padding-bottom: 96px;
  }

  @media (--rpl-bp-xl) {
    padding-top: var(--rpl-sp-13);
    padding-bottom: var(--rpl-sp-14);
  }
}
</style>
