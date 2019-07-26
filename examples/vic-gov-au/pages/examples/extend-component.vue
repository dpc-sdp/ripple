<template>
  <div>
    <h1>Example for extending component</h1>
    <example-button href="#" theme="primary" >Extending RplButton</example-button>
  </div>
</template>

<script>
import ExampleButton from './../../components/examples/Button'
export default {
  components: {
    ExampleButton
  },
  layout: 'minimal'
}
</script>
