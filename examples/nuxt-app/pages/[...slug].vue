<template>
  <div>
    <rpl-icon-sprite />
    <rpl-icon name="icon-chevron-left"></rpl-icon>
    <rpl-icon name="icon-browser" theme="accent" size="l"></rpl-icon>
    <TidePage>
      <template #header> CUSTOM HEADER </template>
    </TidePage>
  </div>
</template>

<script>
export default {
  name: 'TideWrapper'
}
</script>
