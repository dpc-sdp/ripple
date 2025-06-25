<template>
  <figure class="docs-example">
    <div class="docs-example-body">
      <img :src="src" :alt="alt" />
    </div>
    <div class="docs-example-footer" v-if="$slots.default">
      <figcaption>
        <ContentSlot :use="$slots.default" unwrap="p" />
      </figcaption>
    </div>
  </figure>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  alt: string
}

withDefaults(defineProps<Props>(), {})
</script>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';
.docs-example {
  border: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  background: white;

  margin: var(--rpl-sp-3) 0;

  @media (--rpl-bp-l) {
    margin: var(--rpl-sp-4) 0;
  }
}

.docs-example-body {
  padding: var(--rpl-sp-5);

  img {
    max-width: 100%;
  }
}

.docs-example-footer {
  border-top: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding: var(--rpl-sp-3) var(--rpl-sp-5);
}
</style>
