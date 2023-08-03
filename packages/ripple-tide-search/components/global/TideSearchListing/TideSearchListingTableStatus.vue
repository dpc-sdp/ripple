<template>
  <span class="fv_recommendation_status" :class="status.class">
    {{ item.fv_recommendation_status[0] }}
    <RplIcon :name="status.icon" size="s" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  item: {
    fv_recommendation_status: string
  }
}

const props = defineProps<Props>()

const status = computed(() => {
  switch (props.item?.fv_recommendation_status[0]) {
    case 'Implemented':
      return {
        icon: 'icon-check-circle-filled',
        class: 'fv_recommendation_status--implemented'
      }
    default:
      return {
        icon: 'icon-information-circle-filled',
        class: 'fv_recommendation_status--implemented'
      }
  }
})
</script>

<style>
.fv_recommendation_status {
  display: flex;
  flex-direction: row;
  align-items: center;

  &--implemented {
    svg {
      color: var(--rpl-clr-success);
    }
  }
  svg {
    margin-left: var(--rpl-sp-2);
  }
}
</style>
