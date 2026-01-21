/**
 * Twig Template Renderer for Storybook
 *
 * This utility renders Twig templates into HTML strings for use in Storybook HTML stories.
 */

import Twig from 'twig'

/**
 * Render a Twig template with the given context
 *
 * @param template - The Twig template string or object
 * @param context - Variables to pass to the template
 * @returns Rendered HTML string
 */
export function renderTwig(
  template: string | any,
  context: Record<string, any> = {}
): string {
  try {
    // If template is already a string, use it directly
    const templateString =
      typeof template === 'string' ? template : template.default || template

    // Create a Twig template
    const twigTemplate = Twig.twig({
      data: templateString
    })

    // Render the template with the context
    return twigTemplate.render(context)
  } catch (error) {
    console.error('Error rendering Twig template:', error)
    return `<div style="color: red; padding: 1rem; border: 2px solid red;">
      <strong>Twig Rendering Error:</strong><br>
      ${error instanceof Error ? error.message : String(error)}
    </div>`
  }
}

/**
 * Render a Twig template and wrap it in a container for better Storybook display
 *
 * @param template - The Twig template string or object
 * @param context - Variables to pass to the template
 * @param wrapperClass - Optional CSS class for the wrapper div
 * @returns Rendered HTML string wrapped in a container
 */
export function renderTwigWithWrapper(
  template: string | any,
  context: Record<string, any> = {},
  wrapperClass: string = 'component-preview'
): string {
  const rendered = renderTwig(template, context)
  return `<div class="${wrapperClass}">${rendered}</div>`
}
