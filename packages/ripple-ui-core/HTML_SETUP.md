# HTML/Twig Component Implementation - Setup Guide

This document explains the multi-target component architecture that has been set up for Ripple UI Core.

## What Was Created

### 1. New Storybook Instance for HTML Components

**Location:** `packages/ripple-storybook-html/`

A dedicated Storybook instance for viewing and testing HTML/Twig components:
- Runs on port 6007 (Vue Storybook is on 6006)
- Configured to render Twig templates
- Imports shared CSS from ripple-ui-core
- Includes Vite plugin for importing .twig files

### 2. Restructured RplButton Component

**Location:** `packages/ripple-ui-core/src/components/button/`

The button component now follows a multi-target structure:

```
button/
├── RplButton.css           # Shared CSS (unchanged)
├── constants.ts            # Shared types (unchanged)
├── vue/                    # Vue implementation
│   ├── RplButton.vue
│   ├── RplButton.stories.ts
│   └── RplButton.play.ts
└── html/                   # NEW: HTML/Twig implementation
    ├── RplButton.twig
    └── RplButton.stories.ts
```

### 3. Twig Template for RplButton

**File:** `packages/ripple-ui-core/src/components/button/html/RplButton.twig`

Features:
- Mirrors the Vue component's HTML structure
- Uses identical BEM class names
- Supports all button variants through Twig variables
- Includes comprehensive documentation comments
- No JavaScript - pure static HTML output

### 4. HTML Storybook Stories

**File:** `packages/ripple-ui-core/src/components/button/html/RplButton.stories.ts`

Stories that:
- Import the Twig template
- Use the `renderTwig()` utility to render HTML
- Share constants with the Vue component
- Include all major variants (filled, outlined, white, elevated, etc.)

### 5. Twig Renderer Utility

**File:** `packages/ripple-ui-core/src/utils/twig-renderer.ts`

A utility function that:
- Takes a Twig template string
- Renders it with provided context/props
- Returns HTML for display in Storybook

### 6. Updated Documentation

**File:** `packages/ripple-ui-core/AGENTS.md`

Added comprehensive documentation covering:
- Multi-target component architecture
- How to create Twig templates
- HTML Storybook configuration
- Best practices for HTML/Twig development
- Migration guide for existing components

## Getting Started

### Install Dependencies

```bash
# From the project root
pnpm install

# Or in the HTML storybook directory
cd packages/ripple-storybook-html
pnpm install
```

### Run the HTML Storybook

```bash
cd packages/ripple-storybook-html
pnpm start
```

This will start Storybook on http://localhost:6007

### View the Button Component

Once Storybook is running, navigate to:
- **HTML Components > Navigation > Button**

You'll see all the button variants rendered as static HTML.

## Key Concepts

### Shared CSS
The CSS file (`RplButton.css`) is at the component root and used by both Vue and Twig implementations. This ensures visual consistency.

### Twig Variables
The Twig template accepts these variables:
- `el` - Element type ('button' or 'a')
- `variant` - Style variant ('filled', 'outlined', etc.)
- `theme` - Theme ('default' or 'neutral')
- `icon_name` - Icon identifier
- `icon_position` - Icon placement ('left' or 'right')
- `label` - Button text
- `disabled` - Disabled state
- `busy` - Loading state
- `url` - URL for anchor elements

### No Interactivity
The Twig templates focus solely on HTML structure. JavaScript behaviors will be handled separately in Drupal.

## Creating More HTML/Twig Components

To add HTML/Twig support to another component:

1. Create `html/` subdirectory in the component folder
2. Create `ComponentName.twig` template
3. Create `ComponentName.stories.ts` for HTML Storybook
4. Ensure BEM classes match the Vue component exactly
5. Move Vue files to `vue/` subdirectory (if not already done)
6. Test in both Storybooks

See the updated AGENTS.md for detailed step-by-step instructions.

## File Structure Summary

```
ripple/
├── packages/
│   ├── ripple-ui-core/
│   │   └── src/
│   │       ├── components/
│   │       │   └── button/
│   │       │       ├── RplButton.css         # Shared
│   │       │       ├── constants.ts          # Shared
│   │       │       ├── vue/                  # Vue target
│   │       │       │   ├── RplButton.vue
│   │       │       │   ├── RplButton.stories.ts
│   │       │       │   └── RplButton.play.ts
│   │       │       └── html/                 # HTML target
│   │       │           ├── RplButton.twig
│   │       │           └── RplButton.stories.ts
│   │       └── utils/
│   │           └── twig-renderer.ts          # Twig utility
│   ├── ripple-storybook/                     # Vue Storybook (port 6006)
│   └── ripple-storybook-html/                # HTML Storybook (port 6007)
│       ├── .storybook/
│       │   ├── main.ts
│       │   ├── preview.ts
│       │   ├── themes.js
│       │   └── vite-plugin-twig.ts
│       └── package.json
```

## Next Steps

1. **Install dependencies** if not already done
2. **Run the HTML Storybook** to verify the setup
3. **Review the RplButton example** to understand the pattern
4. **Create HTML/Twig versions** of other components as needed
5. **Refer to AGENTS.md** for detailed guidelines

## Troubleshooting

If you encounter issues:

1. **Twig files not loading**: Ensure the vite-plugin-twig is configured in `.storybook/main.ts`
2. **CSS not applying**: Check that `@dpc-sdp/ripple-ui-core/style` is imported in `.storybook/preview.ts`
3. **Stories not appearing**: Verify the story glob pattern in `.storybook/main.ts` matches your file structure
4. **Import errors**: Make sure the Twig package is installed (`twig` in package.json)

## Benefits of This Approach

✅ **Shared CSS** - One source of truth for styles
✅ **Consistent naming** - BEM classes match between Vue and Twig
✅ **Type safety** - Shared constants ensure consistency
✅ **Separate concerns** - Vue for dynamic apps, Twig for Drupal
✅ **Testable** - Both targets have Storybook stories
✅ **Maintainable** - Clear structure for each target
✅ **Drupal-ready** - Twig templates can be used directly in Drupal themes
