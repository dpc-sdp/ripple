<template>
  <svg :aria-hidden="!hasAlt" class="rpl-campaign-primary__image" width="699" height="411" viewBox="0 0 699 411" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title v-if="hasAlt">{{ image.alt }}</title>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="699" height="411">
      <path d="M699 0L114.075 170.226L0 411H699V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0)">
      <image width="699" height="411" :xlink:href="image.src" :href="image.src" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'RplCampaignPrimaryImage',
  props: {
    image: Object,
    hasAlt: Boolean
  }
}
</script>
