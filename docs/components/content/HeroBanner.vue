<script setup lang="ts">
defineProps({
  bgimg: {
    type: String,
    default: () => ''
  }
})
</script>

<template>
  <section
    class="py-12 lg:py-16 my-16"
    :style="`background-image: url(${bgimg});`"
  >
    <Container class="my-16 flex flex-col lg:flex-row">
      <div
        class="
          mb-8
          flex flex-col
          items-center
          pr-0
          lg:mb-0
          lg:w-2/3
          lg:items-start
          lg:pr-8
        "
      >
        <h2
          class="
            mb-8
            text-center text-5xl
            font-semibold
            tracking-tighter
            text-gray-900
            dark:text-gray-100
            sm:text-6xl
            sm:leading-none
            lg:text-left lg:text-7xl
          "
        >
          <Markdown :use="$slots.title" unwrap="p" />
        </h2>

        <p
          class="
            leading-base
            mb-8
            text-center text-lg
            font-medium
            tracking-tight
            text-gray-700
            dark:text-gray-300
            sm:text-xl
            lg:text-left
            xl:text-xl
          "
        >
          <Markdown :use="$slots.description" unwrap="p" />
        </p>
      </div>
    </Container>
  </section>
</template>

<style scoped>
section {
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
