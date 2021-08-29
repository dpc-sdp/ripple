<template>
  <div>{{error}}</div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        message: 'Error',
        status: 500
      })
    }
  }
}
</script>

<style>

</style>