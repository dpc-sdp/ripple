<template>
  <div class="rpl-page--landing-page">
    <h1>LANDING PAGE template in nuxt project</h1>
    <h2>{{page.title}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object
    }
  }
}
</script>

<style>

</style>
