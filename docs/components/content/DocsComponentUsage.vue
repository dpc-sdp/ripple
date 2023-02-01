<template>
  <div class="grid grid-cols-2 gap-8 my-8">
    <DocsComponentUsageContainer :use="true" v-if="$slots.do">
      <slot name="do"></slot>
    </DocsComponentUsageContainer>
    <DocsComponentUsageContainer :use="false" v-if="$slots.dont">
      <slot name="dont"></slot>
    </DocsComponentUsageContainer>
  </div>
</template>
