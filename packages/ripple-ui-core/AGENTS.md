# Ripple UI Core Components - Development guide

This guide helps developers and agents understand how to create and modify Vue components in the Ripple UI Core design system.

## Project Overview

Ripple UI Core is a Vue 3-based component library using TypeScript, PostCSS, and Storybook. Components follow a consistent structure with co-located files for templates, styles, stories, and tests.

## Directory Structure

Each component lives in its own directory under `packages/ripple-ui-core/src/components/`:

### Multi-Target Component Structure

Components support multiple export targets (Vue, HTML/Twig, etc.) with shared styles:

```
components/
├── component-name/
│   ├── RplComponentName.css       # Shared styles for all targets
│   ├── constants.ts               # Shared TypeScript constants and types
│   ├── vue/                       # Vue-specific implementation
│   │   ├── RplComponentName.vue
│   │   ├── RplComponentName.stories.ts
│   │   └── RplComponentName.play.ts
│   ├── html/                      # HTML/Twig implementation
│   │   ├── RplComponentName.twig
│   │   └── RplComponentName.stories.ts
│   └── fixtures/                  # Shared test/story data fixtures (optional)
│       ├── sample.ts
│       └── default.ts
```

### Legacy Single-Target Structure

Some components may still use the older single-target structure:

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

Always reference the co-located CSS file:

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

---

## HTML/Twig Components for Drupal

### Overview

In addition to Vue components, Ripple supports HTML/Twig implementations for Drupal integration. These components share CSS with their Vue counterparts but use Twig templating for static HTML output.

### Multi-Target Architecture

Components are organized with separate directories for each target:

```
button/
├── RplButton.css              # Shared CSS (used by both Vue and HTML)
├── constants.ts               # Shared TypeScript types and constants
├── vue/                       # Vue implementation
│   ├── RplButton.vue
│   ├── RplButton.stories.ts
│   └── RplButton.play.ts
└── html/                      # HTML/Twig implementation
    ├── RplButton.twig
    └── RplButton.stories.ts
```

**Key Principles:**
- CSS files remain at the component root level and are shared between all targets
- Each target has its own subdirectory with implementation-specific files
- The `constants.ts` file is shared for consistency
- Storybook stories exist for each target separately

### Creating Twig Templates

Twig templates mirror the structure and BEM classes of Vue components:

**RplButton.twig**:
```twig
{#
/**
 * Ripple Button Component - Twig Template
 *
 * Available variables:
 * - el: The HTML element type ('button' or 'a')
 * - variant: Button variant ('filled', 'outlined', 'white', etc.)
 * - theme: Button theme ('default' or 'neutral')
 * - label: Button text label
 * - disabled: Boolean to disable the button
 */
#}
{% set el = el|default('button') %}
{% set variant = variant|default('filled') %}
{% set theme = theme|default('default') %}

{% set classes = [
  'rpl-button',
  'rpl-button--' ~ variant,
  'rpl-button--' ~ theme,
  'rpl-u-focusable-block'
] %}

{% if el == 'a' %}
<a href="{{ url }}" class="{{ classes|join(' ')|trim }}">
  <span class="rpl-button__label rpl-type-label rpl-type-weight-bold">
    {{ label }}
  </span>
</a>
{% else %}
<button type="button" class="{{ classes|join(' ')|trim }}" {% if disabled %}disabled{% endif %}>
  <span class="rpl-button__label rpl-type-label rpl-type-weight-bold">
    {{ label }}
  </span>
</button>
{% endif %}
```

### Twig Template Conventions

1. **Document variables**: Use Twig comments to document available variables
2. **Set defaults**: Use `|default()` filter for all variables
3. **Build classes array**: Create a classes array for conditional CSS classes
4. **Match BEM naming**: Use identical CSS class names as Vue components
5. **Conditional rendering**: Use `{% if %}` for variants and optional elements
6. **No interactivity**: Focus on static HTML output only

### HTML Storybook Stories

Stories for HTML components use the Twig renderer utility:

**RplButton.stories.ts** (in html/ directory):
```typescript
import type { Meta, StoryObj } from '@storybook/html'
import { renderTwig } from '../../../utils/twig-renderer'
import RplButtonTwig from './RplButton.twig'
import {
  RplButtonVariants,
  RplButtonThemes,
  RplButtonElements
} from '../constants'

export default {
  title: 'HTML Components/Navigation/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: RplButtonVariants
    },
    theme: {
      control: { type: 'select' },
      options: RplButtonThemes
    },
    el: {
      control: { type: 'select' },
      options: RplButtonElements
    }
  },
  args: {
    label: 'Button text',
    disabled: false
  },
  render: (args) => {
    return renderTwig(RplButtonTwig, args)
  }
} satisfies Meta

type Story = StoryObj

export const DefaultFilled: Story = {
  name: 'Default/Filled',
  args: {
    variant: 'filled'
  }
}

export const DefaultOutlined: Story = {
  name: 'Default/Outlined',
  args: {
    variant: 'outlined'
  }
}
```

### HTML Storybook Configuration

A separate Storybook instance exists for HTML components at `packages/ripple-storybook-html/`:

**Key files:**
- `.storybook/main.ts` - Configures Storybook to find HTML stories and use Twig plugin
- `.storybook/preview.ts` - Imports shared CSS and sets up themes
- `.storybook/vite-plugin-twig.ts` - Vite plugin to import .twig files as strings

**Running HTML Storybook:**
```bash
cd packages/ripple-storybook-html
pnpm start  # Runs on port 6007
```

### Twig Renderer Utility

The `renderTwig` utility is located at `src/utils/twig-renderer.ts`:

```typescript
import Twig from 'twig'

export function renderTwig(template: string | any, context: Record<string, any> = {}): string {
  const templateString = typeof template === 'string' ? template : template.default || template
  const twigTemplate = Twig.twig({ data: templateString })
  return twigTemplate.render(context)
}
```

This utility:
- Takes a Twig template (imported as a string)
- Renders it with the provided context/props
- Returns HTML string for Storybook

### Creating a New Multi-Target Component

1. **Create the directory structure**:
   ```bash
   mkdir -p components/my-component/{vue,html}
   ```

2. **Create shared files**:
   - `RplMyComponent.css` - Component styles
   - `constants.ts` - Type definitions and constants

3. **Create Vue implementation** in `vue/`:
   - `RplMyComponent.vue` - Vue component
   - `RplMyComponent.stories.ts` - Vue stories

4. **Create HTML/Twig implementation** in `html/`:
   - `RplMyComponent.twig` - Twig template
   - `RplMyComponent.stories.ts` - HTML stories

5. **Ensure CSS classes match** between Vue and Twig templates

6. **Test in both Storybooks**:
   - Vue: `packages/ripple-storybook` (port 6006)
   - HTML: `packages/ripple-storybook-html` (port 6007)

### Migrating Existing Components to Multi-Target

1. **Create subdirectories**:
   ```bash
   cd components/button
   mkdir -p vue html
   ```

2. **Move Vue files**:
   ```bash
   mv RplButton.vue RplButton.stories.ts RplButton.play.ts vue/
   ```

3. **Keep CSS at root**:
   - `RplButton.css` stays in the component root

4. **Create Twig template** in `html/`:
   - Mirror the Vue component's structure
   - Use same BEM classes
   - Add Twig variable documentation

5. **Create HTML stories** in `html/`:
   - Import shared constants
   - Use `renderTwig` utility
   - Match Vue story structure

6. **Update imports** if the component is exported:
   - Update index files to point to `vue/` subdirectory

### Interactive HTML Components with Web Components

For components requiring JavaScript interactivity (dismiss, toggle, animation, etc.), use Web Components:

**Architecture:**
```
alert/
├── RplAlert.css              # Shared CSS
├── constants.ts              # Shared types
├── vue/                      # Vue implementation
│   ├── RplAlert.vue
│   └── RplAlert.stories.ts
└── html/                     # HTML/Twig + Web Component
    ├── RplAlert.twig         # Static HTML template
    ├── RplAlert.ts           # Web Component (JavaScript behavior)
    ├── RplAlert.d.ts         # TypeScript definitions
    └── RplAlert.stories.ts   # HTML Storybook stories
```

**Web Component Pattern:**

````typescript
// RplAlert.ts
export class RplAlert extends HTMLElement {
  private closeButton: HTMLButtonElement | null = null
  
  connectedCallback() {
    this.closeButton = this.querySelector('[data-dismiss]')
    
    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.handleDismiss)
    }
    
    this.updateHeight()
  }
  
  disconnectedCallback() {
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.handleDismiss)
    }
  }
  
  private handleDismiss = () => {
    // Emit custom event for tracking
    this.dispatchEvent(
      new CustomEvent('rpl-alert:dismiss', {
        bubbles: true,
        composed: true,
        detail: { id: this.dataset.alertId }
      })
    )
    
    // Apply CSS class for animation
    this.classList.add('rpl-alert--closed')
  }
}

// Auto-register if in browser
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('rpl-alert')) {
    customElements.define('rpl-alert', RplAlert)
  }
}
````

**Key Web Component Principles:**

1. **Progressive Enhancement**: HTML works without JavaScript
2. **Light DOM**: Don't use Shadow DOM (for CSS sharing)
3. **Data Attributes**: Use for configuration (`data-alert-id`, `data-message`)
4. **Custom Events**: Emit events for tracking (`rpl-alert:dismiss`)
5. **Clean up**: Remove listeners in `disconnectedCallback()`
6. **TypeScript**: Write in TS, compile to vanilla JS
7. **Auto-register**: Define custom element automatically in browser
8. **Selective queries**: Use `data-*` attributes for interactive elements

**Twig Template for Web Components:**

````twig
<rpl-alert 
  class="rpl-alert rpl-alert--{{ variant }}"
  data-alert-id="{{ alert_id }}"
  data-message="{{ message }}"
>
  <div class="rpl-alert__inner">
    <!-- Static HTML content -->
    <button data-dismiss="true">Close</button>
  </div>
</rpl-alert>
````

**HTML Storybook with Web Components:**

````typescript
// Import the web component to register it
import './RplAlert'

export const Default: Story = {
  render: (args) => {
    const html = renderTwig(template, args)
    
    // Optional: Add event listeners in story
    setTimeout(() => {
      const alert = document.querySelector('[data-alert-id]')
      alert?.addEventListener('rpl-alert:dismiss', (e) => {
        console.log('Dismissed:', e.detail)
      })
    }, 100)
    
    return html
  }
}
````

**When to Use Web Components vs Static HTML:**

- ✅ **Use Web Components**: Dismiss/close, expand/collapse, show/hide, animations, form validation, dynamic updates
- ✅ **Use Static HTML**: Links, text, images, layout, cards, simple buttons (without interactions)

### HTML/Twig Best Practices

**✅ DO:**
- Share CSS files between Vue and Twig implementations
- Use identical BEM class names in both targets
- Document all Twig variables with comments
- Use Twig's `|default()` filter for all variables
- Import shared constants from parent directory
- Test in HTML Storybook to verify rendering
- Use Web Components for interactivity (dismiss, toggle, etc.)
- Clean up event listeners in `disconnectedCallback()`
- Use `data-*` attributes to mark interactive elements

**❌ DON'T:**
- Don't duplicate CSS files between targets
- Don't use different class names in Twig than Vue
- Don't add inline JavaScript to Twig templates
- Don't forget to document Twig variables
- Don't hardcode values that should be variables
- Don't skip Storybook stories for HTML components
- Don't use Shadow DOM (breaks shared CSS)
- Don't forget to auto-register custom elements

### Drupal Integration Notes

The HTML/Twig components are designed for Drupal integration:

1. **Twig templates** can be used directly in Drupal themes
2. **CSS files** are compiled and included in Drupal
3. **JavaScript behaviors** are handled separately in Drupal (not in Twig)
4. **Design tokens** (CSS custom properties) work the same way
5. **BEM class structure** is identical to Vue components

### Story Organization

HTML component stories follow a specific path pattern:
- Vue stories: `Core/Category/ComponentName`
- HTML stories: `HTML Components/Category/ComponentName`

This keeps them organized in separate sections of Storybook.


