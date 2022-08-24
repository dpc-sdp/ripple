<script setup lang="ts">
import { PropType, onMounted } from 'vue'
import { computed, useRoute } from '#imports'

const props = defineProps({
  links: {
    type: Array as PropType<any>,
    default: () => []
  },
  level: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 3
  },
  parent: {
    type: Object as PropType<any>,
    default: null
  }
})

const route = useRoute()

function isActive(link) {
  return link.exact
    ? route.path === link._path
    : route.path.startsWith(link._path)
}

function isHidden(link) {
  if (link.children) {
    return !link.visible
  }
  return false
}

function toggleMenu(link) {
  link.visible = !link.visible
  return link.visible
}

const hasNesting = computed(() =>
  props.links.some((link: any) => link.children)
)

onMounted(() => {
  if (props.links.length > 0) {
    props.links.forEach((link) => {
      if (link.children && link.children.some((l) => isActive(l))) {
        link.visible = true
      }
    })
  }
})
</script>

<template>
  <ul>
    <li
      v-for="(link, index) of links"
      :key="link._path"
      class="transition-colors transition-base text-gray-900 dark:text-gray-200"
      :class="{
        'ml-2': parent?.icon,
        'my-4': link.children,
        'pl-4': level > 0 && link.children,
        'border-l': level > 0 || !hasNesting,
        'border-primary-400 dark:border-primary-600': isActive(link),
        'hover:border-gray-300 border-gray-100 dark:border-gray-700 hover:dark:border-gray-500':
          !isActive(link),
        'is-closed': isHidden(link)
      }"
    >
      <div
        v-if="link.children"
        class="flex pt-2 text-sm font-semibold text-gray-900 dark:text-gray-200"
      >
        <button
          class="flex-row inline-flex items-center w-full"
          @click="toggleMenu(link)"
        >
          <Icon v-if="link.icon" :name="link.icon" class="w-4 h-4 mr-2" />
          <span>{{ link.title }}</span>
          <Icon
            name="bi:caret-down-fill"
            :rotate="isHidden(link) && '180deg'"
            class="text-gray-200 w-4 h-4 ml-auto mr-2"
          />
        </button>
      </div>
      <NuxtLink
        v-else
        :to="link._path"
        class="flex items-center justify-between text-sm py-1.5"
        :exact="link.exact"
        :class="{
          'pl-4': level > 0 || !hasNesting,
          '!pt-0': level === 0 && index === 0,
          'text-primary font-medium': isActive(link),
          'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200':
            !isActive(link)
        }"
      >
        <span class="inline-flex items-center">
          <Icon v-if="link.icon" :name="link.icon" class="w-4 h-4 mr-2" />
          <span>{{ link.title }}</span>
        </span>
      </NuxtLink>

      <SidebarNavigation
        v-if="link.children?.length && (max === null || level + 1 < max)"
        :links="link.children"
        :level="level + 1"
        :parent="link"
        :max="max"
        :class="{
          hidden: isHidden(link)
        }"
        class="py-2"
      />
    </li>
  </ul>
</template>
