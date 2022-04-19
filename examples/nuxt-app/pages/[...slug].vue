<template>
  <div>
    <rpl-icon-sprite />
    <TidePage>
      <template #header>
        CUSTOM HEADER
        <rpl-icon name="icon-chevron-left"></rpl-icon>
        <rpl-icon name="icon-facebook"></rpl-icon>
      </template>
    </TidePage>
  </div>
</template>

<script>
export default {
  name: 'TideWrapper'
}
</script>
