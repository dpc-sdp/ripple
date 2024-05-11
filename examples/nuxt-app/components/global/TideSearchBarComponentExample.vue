<template>
  <div class="tide-search-bar-component-example">
    <RplSearchBar
      :id="id"
      :variant="variant"
      :input-label="inputLabel"
      :input-value="inputValue.q"
      :placeholder="placeholder"
      :suggestions="suggestions"
      :global-events="globalEvents"
      @submit="handleSubmit"
      @update:input-value="handleUpdate"
    >
      <template #afterInput>
        <label for="query-type" class="rpl-u-visually-hidden">
          Select a search type
        </label>
        <RplFormDropdown
          id="query-type"
          label-id="query-type-label-id"
          :multiple="false"
          :value="props.inputValue.queryType || 'title_content'"
          :options="[
            {
              id: 'title_content',
              label: 'Title and content',
              value: 'title_content'
            },
            {
              id: 'title',
              label: 'Title',
              value: 'title'
            },
            {
              id: 'content',
              label: 'Content',
              value: 'content'
            }
          ]"
          @onChange="handleChange"
        />
      </template>
    </RplSearchBar>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  variant?: string
  inputLabel: string
  inputValue: Record<string, any>
  placeholder: string
  suggestions: any[]
  globalEvents: boolean
  handleSubmit: (event: any) => void
  handleUpdate: (event: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const handleChange = (value: string) => props.handleUpdate({ queryType: value })
</script>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-bar-component-example {
  .rpl-search-bar__inner {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0 var(--rpl-sp-4);

    @media (--rpl-bp-l) {
      display: flex;
      align-items: center;
    }
  }

  .rpl-search-bar__clear {
    display: none;
  }

  .rpl-form-dropdown {
    order: 1;
    grid-column: span 2;

    @media (--rpl-bp-l) {
      width: 210px;
      order: initial;
    }

    .rpl-form-dropdown__chevron {
      right: var(--local-search-bar-inline-padding);
    }

    &-input {
      height: auto;
      border-radius: 0;
      padding-block: var(--local-search-bar-block-padding);
      padding-inline: var(--local-search-bar-inline-padding);

      &:not(:focus):not(.rpl-u-focusable--force-on) {
        border-color: transparent;
        border-top-color: var(--rpl-clr-neutral-200);
      }

      @media (--rpl-bp-l) {
        padding: var(--rpl-sp-1) var(--rpl-sp-3);

        &:not(:focus):not(.rpl-u-focusable--force-on) {
          border-top-color: transparent;
          border-left-color: var(--rpl-clr-neutral-300);
          border-right-color: var(--rpl-clr-neutral-300);
        }
      }
    }
  }
}
</style>
