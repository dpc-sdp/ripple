<template>
  <div>
    <rpl-icon-sprite />
    <TidePage>
      <template #header>
        CUSTOM HEADER
        <rpl-icon name="download"></rpl-icon>
        <rpl-icon name="facebook"></rpl-icon>
      </template>
    </TidePage>
  </div>
</template>

<script>
export default {
  name: 'TideWrapper'
}
</script>
