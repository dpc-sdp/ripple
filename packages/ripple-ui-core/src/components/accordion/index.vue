<script lang="ts">
export type Panel = {
  id: number
  title: string
  isOpen: Boolean
  content: String
}
</script>

<script setup lang="ts">
interface Props {
  panels: Panel[]
  title: String
}
const props = defineProps<Props>()

const accordionId = (idx) => {
  return Math.random() + idx
}
const accordionIsOpen = (idx) => {
  return props.panels[idx].isOpen
}
const accordionClick = (idx) => {
  props.panels[idx].isOpen = !props.panels[idx].isOpen
}

const isRtl = () => false
</script>

<template>
  <div class="rpl-accordion">
    <ul class="rpl-accordion__list">
      <li
        class="rpl-accordion__list-item"
        v-for="(accordion, index) in panels"
        :key="index"
        :class="{
          'rpl-accordion__list-item--expanded': accordionIsOpen(index)
        }"
      >
        <h2
          class="rpl-accordion__title"
          :class="{ 'rpl-accordion__title--expanded': accordionIsOpen(index) }"
        >
          <button
            @click="accordionClick(index)"
            class="rpl-accordion__button"
            :class="{
              'rpl-accordion__button--expanded': accordionIsOpen(index)
            }"
            :aria-expanded="accordionIsOpen(index).toString()"
            :aria-controls="accordionId(index)"
          >
            <span
              class="rpl-accordion__button-text"
              :class="{ 'rpl-accordion__button-text--rtl': isRtl() }"
              >{{ accordion.title }}</span
            >
          </button>
        </h2>
        <div
          class="rpl-accordion__content"
          :id="accordionId(index)"
          :ref="accordionId(index)"
        >
          <div
            class="rpl-accordion__content-inner"
            v-html="accordion.content"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
@import './accordion.css';
</style>
