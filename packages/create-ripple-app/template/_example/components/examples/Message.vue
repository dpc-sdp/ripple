<template>
  <div class="example-message">
    <h2>This is a example of custom component</h2>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'exampleMessage',
  props: {
    text: String
  }
}
</script>
