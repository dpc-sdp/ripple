<script lang="ts">
export default {
  name: 'RplAccordion'
}
export type Panel = {
  id: number
  title: string
  isOpen: boolean
  content: string
}
</script>

<script setup lang="ts">
interface Props {
  panels: Panel[]
  title: string
}
const props = defineProps<Props>()

const accordionId = (idx) => {
  return Math.random() + idx
}
const accordionIsOpen = (idx) => {
  return props.panels[idx].isOpen
}
const accordionClick = (idx) => {
  /* eslint-disable-next-line vue/no-mutating-props */
  props.panels[idx].isOpen = !props.panels[idx].isOpen
}

const isRtl = () => false
</script>

<template>
  <div class="rpl-accordion">
    <ul class="rpl-accordion__list">
      <li
        v-for="(accordion, index) in panels"
        :key="index"
        class="rpl-accordion__list-item"
        :class="{
          'rpl-accordion__list-item--expanded': accordionIsOpen(index)
        }"
      >
        <h2
          class="rpl-accordion__title"
          :class="{ 'rpl-accordion__title--expanded': accordionIsOpen(index) }"
        >
          <button
            class="rpl-accordion__button"
            :class="{
              'rpl-accordion__button--expanded': accordionIsOpen(index)
            }"
            :aria-expanded="accordionIsOpen(index).toString()"
            :aria-controls="accordionId(index)"
            @click="accordionClick(index)"
          >
            <span
              class="rpl-accordion__button-text"
              :class="{ 'rpl-accordion__button-text--rtl': isRtl() }"
              >{{ accordion.title }}</span
            >
          </button>
        </h2>
        <div
          :id="accordionId(index)"
          :ref="accordionId(index)"
          class="rpl-accordion__content"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="rpl-accordion__content-inner"
            v-html="accordion.content"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style src="./accordion.css" />
