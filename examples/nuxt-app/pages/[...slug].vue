<template>
  <div>
    <TidePage>
      <template #header>
        CUSTOM HEADER
        <rpl-icon name="icon-chevron-left"></rpl-icon>
        <rpl-icon name="icon-browser" theme="accent" size="l"></rpl-icon>
      </template>
    </TidePage>
  </div>
</template>

<script>
export default {
  name: 'TideWrapper'
}
</script>
