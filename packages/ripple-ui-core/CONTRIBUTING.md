# Ripple UI Core Components - Development guide

This guide helps developers and agents understand how to create and modify Vue components in the Ripple UI Core design system.

## Project Overview

Ripple UI Core is a Vue 3-based component library using TypeScript, PostCSS, and Storybook. Components follow a consistent structure with co-located files for templates, styles, stories, and tests.

## Directory Structure

Each component lives in its own directory under `packages/ripple-ui-core/src/components/`:

```
components/
├── component-name/
│   ├── RplComponentName.vue       # Main component file
│   ├── RplComponentName.css       # Component styles
│   ├── RplComponentName.stories.ts # Storybook stories
│   ├── RplComponentName.cy.ts     # Cypress component tests (optional)
│   ├── RplComponentName.play.ts   # Storybook play functions (optional)
│   ├── constants.ts               # TypeScript constants and types (optional)
│   ├── fixtures/                  # Test/story data fixtures (optional)
│   │   ├── sample.ts
│   │   └── default.ts
│   └── RplSubComponent.vue        # Additional sub-components (if needed)
```

Components are exported from packages/ripple-ui-core/src/components.ts and new components need to be added there.


## Vue Component Structure

### 1. Script Setup Pattern

All components use the Composition API with `<script setup lang="ts">`:

```vue
<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import type { ComponentType } from './constants'

// Define Props interface
interface Props {
  variant?: 'default' | 'alternate'
  label?: string
  disabled?: boolean
}

// Use withDefaults for default prop values
const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  label: '',
  disabled: false
})

// Define emits with typed payloads
const emit = defineEmits<{
  (e: 'click', payload: { id: string }): void
}>()

// Computed properties for dynamic classes
const classes = computed(() => ({
  'rpl-component': true,
  [`rpl-component--${props.variant}`]: true,
  'rpl-component--disabled': props.disabled
}))
</script>
```

### 2. Template Structure

Templates follow these conventions:

- Use semantic HTML elements
- Apply BEM-style class naming: `rpl-component`, `rpl-component__element`, `rpl-component--modifier`
- Include ARIA attributes for accessibility
- Use conditional rendering with `v-if` / `v-show`
- Utilize named slots for flexibility

```vue
<template>
  <component
    :is="el"
    :class="classes"
    :aria-disabled="disabled"
  >
    <div v-if="$slots.upper" class="rpl-component__upper">
      <slot name="upper"></slot>
    </div>
    
    <div class="rpl-component__content">
      <slot></slot>
    </div>
    
    <div v-if="$slots.lower" class="rpl-component__lower">
      <slot name="lower"></slot>
    </div>
  </component>
</template>
```

### 3. Style Import

Styles should always be in a seperate CSS file and be referenced in the Vue component:

```vue
<style src="./RplComponentName.css" />
```

## CSS Structure

### PostCSS with Custom Media Queries

All component styles use PostCSS and follow these conventions:

```css
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.rpl-component {
  /* CSS custom properties for theming */
  --local-bg-clr: var(--rpl-clr-light);
  --local-border-width: var(--rpl-border-2);
  
  /* Base styles */
  position: relative;
  display: flex;
  background-color: var(--local-bg-clr);
  padding: var(--rpl-sp-4);
  border-radius: var(--rpl-border-radius-2);
  
  /* Responsive breakpoints using custom media queries */
  @media (--rpl-bp-s) {
    padding: var(--rpl-sp-5);
  }
  
  @media (--rpl-bp-m) {
    padding: var(--rpl-sp-6);
  }
  
  @media (--rpl-bp-l) {
    padding: var(--rpl-sp-7);
  }
  
  /* Print styles */
  @media print {
    background-color: transparent;
  }
}

/* BEM element */
.rpl-component__element {
  display: block;
}

/* BEM modifier */
.rpl-component--variant {
  --local-bg-clr: var(--rpl-clr-neutral-100);
}

/* State classes */
.rpl-component--disabled {
  opacity: 0.5;
  pointer-events: none;
}
```

### Design Tokens

Use these design token patterns:

- **Colors**: `var(--rpl-clr-light)`, `var(--rpl-clr-dark)`, `var(--rpl-clr-accent)`, `var(--rpl-clr-neutral-100)`
- **Spacing**: `var(--rpl-sp-1)` through `var(--rpl-sp-10)`
- **Borders**: `var(--rpl-border-1)`, `var(--rpl-border-2)`, `var(--rpl-border-3)`
- **Border Radius**: `var(--rpl-border-radius-1)`, `var(--rpl-border-radius-2)`
- **Typography**: `var(--rpl-type-font-family)`, `var(--rpl-type-size-*)`, `var(--rpl-type-lh-*)`, `var(--rpl-type-weight-bold)`
- **Motion**: `var(--rpl-motion-speed-7)`, `var(--rpl-motion-speed-9)`

### Breakpoints

Use custom media queries for responsive design:
- `@media (--rpl-bp-xs)` - Extra small
- `@media (--rpl-bp-s)` - Small
- `@media (--rpl-bp-m)` - Medium
- `@media (--rpl-bp-l)` - Large
- `@media (--rpl-bp-xl)` - Extra large
- `@media (--rpl-bp-xxl)` - Extra extra large

## Constants File

Create a `constants.ts` file for type definitions and constant arrays:

```typescript
// Define element types the component can render as
export const RplComponentElements = ['div', 'section', 'article'] as const

// Define variant options
export const RplComponentVariants = [
  'default',
  'alternate',
  'featured'
] as const

// Define TypeScript types
export interface IRplComponentItem {
  id: string
  title: string
  content: string
  url?: string
}

export type RplComponentSize = 'small' | 'medium' | 'large'

// Export everything as default
export default {
  RplComponentElements,
  RplComponentVariants
}
```

## Composables

Ripple provides several composables for common functionality:

### useRippleEvent

For emitting tracked events:

```typescript
import { useRippleEvent, rplEventPayload } from '../../composables/useRippleEvent'

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-component', emit)

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props.url,
      text: props.title
    },
    { global: true }
  )
}
```

### useAccessibleContainer

For creating accessible interactive containers:

```typescript
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

const { container, trigger } = useAccessibleContainer()
```

### useExpandableState

For managing expandable/collapsible state:

```typescript
import { useExpandableState } from '../../composables/useExpandableState'

const { isItemExpanded, isAllExpanded, toggleItem } = useExpandableState(
  [],
  itemCount,
  activeItems
)
```

### useEmptySlotCheck

For checking if slots have content:

```typescript
import useEmptySlotCheck from '../../composables/useEmptySlotCheck'

const hasContent = useEmptySlotCheck('slotName')
```

## Storybook Stories

Create stories in `RplComponentName.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import RplComponentName from './RplComponentName.vue'
import {
  RplComponentVariants,
  RplComponentElements
} from './constants'

export default {
  title: 'Core/Category/ComponentName',
  component: RplComponentName,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: RplComponentVariants
    },
    el: {
      control: { type: 'select' },
      options: RplComponentElements
    }
  },
  args: {
    label: 'Default label',
    variant: 'default'
  }
} satisfies Meta<typeof RplComponentName>

type Story = StoryObj<typeof RplComponentName>

export const Default: Story = {
  name: 'Default',
  args: {}
}

export const Variant: Story = {
  name: 'Alternate Variant',
  args: {
    variant: 'alternate'
  }
}
```

### Story Categories

Organize stories under these top-level categories:
- `Core/Navigation/` - Navigation components
- `Core/Content/` - Content display components
- `Core/Forms/` - Form elements
- `Core/Layout/` - Layout components

## Cypress Component Tests

Create tests in `RplComponentName.cy.ts` (optional but recommended):

```typescript
import RplComponentName from './RplComponentName.vue'
import defaultFixture from './fixtures/default'

const baseProps = {
  variant: 'default',
  items: defaultFixture
}

describe('RplComponentName', () => {
  it('mounts', () => {
    cy.mount(RplComponentName, { props: { ...baseProps } })
    
    cy.get('.rpl-component').should('exist')
  })

  it('renders with correct variant', () => {
    cy.mount(RplComponentName, {
      props: {
        ...baseProps,
        variant: 'alternate'
      }
    })
    
    cy.get('.rpl-component--alternate').should('exist')
  })

  it('handles user interaction', () => {
    cy.mount(RplComponentName, { props: { ...baseProps } })
    
    cy.get('.rpl-component__button').click()
    cy.get('.rpl-component__content').should('be.visible')
  })

  it('meets accessibility requirements', () => {
    cy.mount(RplComponentName, { props: { ...baseProps } })
    
    cy.get('.rpl-component__button')
      .should('have.attr', 'aria-expanded', 'false')
  })
})
```

## Fixtures

Store test data in `fixtures/` directory:

```typescript
// fixtures/default.ts
export default [
  {
    id: '1',
    title: 'Item 1',
    content: '<p>Content for item 1</p>'
  },
  {
    id: '2',
    title: 'Item 2',
    content: '<p>Content for item 2</p>'
  }
]
```

## Accessibility Guidelines

### Required Patterns

1. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
2. **ARIA Attributes**: Use appropriate ARIA attributes:
   - `aria-label` for icon-only buttons
   - `aria-expanded` for toggleable elements
   - `aria-controls` to link controls to content
   - `aria-hidden` for decorative elements
   - `aria-disabled` for disabled state
3. **Focus Management**: Use the `rpl-u-focusable-block` or `rpl-u-focusable-inline` utility classes
4. **Semantic HTML**: Use appropriate semantic elements (`<button>`, `<nav>`, `<article>`, etc.)
5. **Screen Reader Text**: Use `rpl-u-screen-only` class for screen-reader-only content

### Example

```vue
<template>
  <button
    class="rpl-component__toggle rpl-u-focusable-block"
    type="button"
    :aria-expanded="isExpanded"
    :aria-controls="contentId"
    :aria-label="ariaLabel"
  >
    <span class="rpl-u-screen-only">{{ screenReaderText }}</span>
    <RplIcon name="icon-chevron-down" aria-hidden="true" />
  </button>
</template>
```

## Feature Flags

Use feature flags for conditional behavior:

```typescript
import type { IRplFeatureFlags } from './../../index'

const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  buttonTheme: 'default'
})

const theme = computed(() => {
  if (props.theme) {
    return props.theme
  }
  if (featureFlags?.buttonTheme) {
    return featureFlags.buttonTheme
  }
  return 'default'
})
```

## Component Composition Patterns

### Parent-Child Communication

Use provide/inject for deeply nested components:

```typescript
// Parent component
import { provide, ref, type Ref } from 'vue'

const sharedState: Ref<string[]> = ref([])

provide('sharedContext', {
  sharedState: sharedState,
  parentId: props.id
})

// Child component
import { inject, type Ref } from 'vue'

const { sharedState, parentId } = inject('sharedContext', {
  sharedState: ref<string[]>(),
  parentId: ''
})
```

### Compound Components

Create reusable sub-components within the same directory:

```
accordion/
├── RplAccordion.vue           # Parent container
├── RplAccordionItem.vue       # Child item component
├── RplAccordion.css           # Shared styles
└── constants.ts               # Shared types
```

## Creating a New Component

### Step-by-Step Guide

1. **Create directory**: `packages/ripple-ui-core/src/components/component-name/`

2. **Create Vue component**: `RplComponentName.vue`
   - Use `<script setup lang="ts">`
   - Define Props interface with TypeScript
   - Use withDefaults for defaults
   - Create computed classes
   - Add template with proper BEM classes
   - Reference CSS file

3. **Create styles**: `RplComponentName.css`
   - Import breakpoints
   - Use CSS custom properties
   - Follow BEM naming
   - Include responsive styles
   - Add print styles if needed

4. **Create constants**: `constants.ts`
   - Define const arrays with `as const`
   - Define TypeScript interfaces
   - Export everything

5. **Create stories**: `RplComponentName.stories.ts`
   - Set up Meta with proper title path
   - Define argTypes with controls
   - Create Story variants
   - Add default args

6. **Create tests** (optional): `RplComponentName.cy.ts`
   - Test mounting
   - Test props and variants
   - Test user interactions
   - Test accessibility

7. **Create fixtures** (if needed): `fixtures/default.ts`
   - Export sample data for stories and tests

8. **Export component**: Add to `packages/ripple-ui-core/src/index.ts` (if it should be publicly available)

## Modifying Existing Components

### Guidelines

1. **Read existing code**: Understand the component's structure, dependencies, and usage patterns
2. **Check tests**: Review existing Cypress tests to understand expected behavior
3. **Update types**: If adding new props, update the Props interface and constants file
4. **Maintain accessibility**: Ensure ARIA attributes remain correct
5. **Update stories**: Add new variants or update args in Storybook stories
6. **Test thoroughly**: Run Cypress tests and manually test in Storybook
7. **Update styles**: Follow existing CSS patterns and maintain BEM naming
8. **Document changes**: Update component documentation if behavior changes significantly

### Example: Adding a New Variant

1. Update constants:
```typescript
// constants.ts
export const RplComponentVariants = [
  'default',
  'alternate',
  'new-variant' // Add new variant
] as const
```

2. Update Props (if needed):
```typescript
// Component.vue
interface Props {
  variant?: (typeof RplComponentVariants)[number]
}
```

3. Update CSS:
```css
/* Component.css */
.rpl-component--new-variant {
  --local-bg-clr: var(--rpl-clr-accent);
  color: var(--rpl-clr-light);
}
```

4. Update stories:
```typescript
// Component.stories.ts
export const NewVariant: Story = {
  name: 'New Variant',
  args: {
    variant: 'new-variant'
  }
}
```

5. Update tests:
```typescript
// Component.cy.ts
it('renders new variant correctly', () => {
  cy.mount(RplComponentName, {
    props: { variant: 'new-variant' }
  })
  cy.get('.rpl-component--new-variant').should('exist')
})
```

## Common Patterns and Anti-Patterns

### ✅ DO

- Use TypeScript for all component props and emits
- Use computed properties for dynamic classes
- Import design tokens via CSS custom properties
- Use semantic HTML elements
- Include ARIA attributes for accessibility
- Co-locate all component files in one directory
- Use BEM naming convention for CSS classes
- Include responsive styles with custom media queries
- Test components with Cypress
- Create Storybook stories for all variants

### ❌ DON'T

- Don't use inline styles
- Don't hardcode colors, spacing, or other design tokens
- Don't skip accessibility attributes
- Don't mix px values with design token spacing
- Don't create components without TypeScript types
- Don't forget to handle keyboard navigation
- Don't nest components more than 2-3 levels deep without good reason
- Don't use `@ts-ignore` without explanation
- Don't forget print styles for content components
- Don't skip error states and edge cases

## Testing Checklist

Before completing a component, ensure:

- [ ] Component mounts without errors
- [ ] All props work as expected
- [ ] All variants render correctly
- [ ] User interactions work (clicks, keyboard navigation)
- [ ] ARIA attributes are correct
- [ ] Focus states are visible
- [ ] Component is responsive across breakpoints
- [ ] Print styles work (if applicable)
- [ ] Edge cases are handled (empty content, missing props)
- [ ] TypeScript types are correct
- [ ] Storybook stories cover main use cases
- [ ] Cypress tests pass

## Resources

- **Breakpoints**: Available at `packages/ripple-ui-core/src/lib/breakpoints.ts`
- **Composables**: Located in `packages/ripple-ui-core/src/composables/`
- **Design Tokens**: Defined in the global CSS (imported automatically)
- **Icons**: Available via `RplIcon` component with names from `src/components/icon/constants.ts`
- **Existing Components**: Reference `packages/ripple-ui-core/src/components/` for examples

## Example: Complete Simple Component

Here's a complete example of a simple Tag component:

**RplTag.vue**:
```vue
<script setup lang="ts">
type RplTagVariants = ['default', 'neutral', 'dark']

interface Props {
  variant?: RplTagVariants[number]
  label?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  label: ''
})
</script>

<template>
  <span :class="`rpl-tag rpl-tag--${variant} rpl-type-label-small`">
    {{ label }}
  </span>
</template>

<style src="./RplTag.css" />
```

**RplTag.css**:
```css
.rpl-tag {
  background-color: var(--rpl-tag-bg-clr);
  color: var(--rpl-clr-type-default);
  display: inline-block;
  padding: var(--rpl-sp-1) var(--rpl-sp-2);

  &--default {
    --rpl-tag-bg-clr: var(--rpl-clr-light);
  }

  &--neutral {
    --rpl-tag-bg-clr: var(--rpl-clr-neutral-100);
  }

  &--dark {
    --rpl-tag-bg-clr: var(--rpl-clr-neutral-200);
  }

  & + & {
    margin-left: var(--rpl-sp-3);
  }
}
```

**RplTag.stories.ts**:
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import RplTag from './RplTag.vue'

export default {
  title: 'Core/Content/Tag',
  component: RplTag,
  args: {
    label: 'Tag label',
    variant: 'default'
  }
} satisfies Meta<typeof RplTag>

type Story = StoryObj<typeof RplTag>

export const Default: Story = {
  name: 'Default',
  args: {}
}

export const Neutral: Story = {
  name: 'Neutral',
  args: {
    variant: 'neutral'
  }
}
```

