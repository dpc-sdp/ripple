<script setup>
const props = defineProps({
  context: Object
})

function handleInput(e) {
  props.context.node.input(e.target.value)
}
</script>

<template>
  <input
    class="rpl-text-input"
    @input="handleInput"
    :value="props.context._value"
  />
</template>

<style src="./input.css" />
