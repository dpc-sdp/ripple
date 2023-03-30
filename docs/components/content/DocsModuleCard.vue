<script lang="ts" setup>
interface Props {
  moduleSlug: string
}

const props = withDefaults(defineProps<Props>(), {})

const { data } = await useAsyncData(
  `module-info-${props.moduleSlug}`,
  async () => {
    // Find the _module.json file for this module
    const moduleInfo = await queryContent(
      `framework/modules/${props.moduleSlug}/_module`
    ).findOne()

    return moduleInfo || null
  }
)
</script>

<template>
  <RplPromoCard
    :title="data.name"
    :url="`/framework/modules/${props.moduleSlug}`"
  >
    <template #default>
      <p>{{ data.description }}</p>
    </template>
  </RplPromoCard>
</template>
