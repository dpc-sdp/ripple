# Ripple Storybook HTML

This is a Storybook instance specifically for HTML/Twig versions of Ripple components, designed to be compatible with Drupal.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm start

# Build static site
pnpm static:build
```

## Structure

Components are organized with multi-target support:
- `/vue/` - Vue component implementations
- `/html/` - Twig template implementations and HTML stories
- `*.css` - Shared styles between all targets

## Development

When developing HTML/Twig components:
1. Create Twig templates in the `/html/` subdirectory
2. Share CSS with Vue components (at component root level)
3. Create stories that render the Twig template with various props
4. Focus on static HTML output, interactivity is handled by Drupal behaviors
